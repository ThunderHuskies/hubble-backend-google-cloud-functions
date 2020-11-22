const functions = require('firebase-functions');
const APP_ID = "cstudents";
const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";
const admin = require('firebase-admin');
const { analyzeEntities } = require("./nlp")

admin.initializeApp();

const db = admin.firestore();

var ageRating = 0; 
var courseRating = 0; 
var majorRating = 0; 
var schoolRating = 0; 
var aboutRating = 0; 
var foodRating = 0;
var clubRating = 0; 
var lookingForRating = 0; 
var hometownRating = 0; 

    // function to match age: 
    //collections = the list of users
    //compare user to every other user

    function matchAge(user1, user2) {
        if (user1["age"] === user2["age"]) {
            i["ageRating"] = 10; 
        } else if ((user1["age"] === user2["age"] + 1) || (user1["age"] === user2["age"] - 1 )) {
            i.ageRating = 8; 
        } else if ((user1["age"] === user2["age"] + 2) || (user1["age"] === user2["age"] - 2 )) {
            i.ageRating = 6; 
        } else if ((user1["age"] === user2["age"] + 3) || (user1["age"] === user2["age"] - 3 )) {
            i.ageRating = 4;
        } else if ((user1["age"] === user2["age"] + 4) || (user1["age"] === user2["age"] - 4)) {
            i.ageRating = 2; 
        }
        else if ((user1["age"] === user2["age"] + 5) || (user1["age"] === user2["age"] - 5)) {
            i.ageRating = 0; 
        }
        console.log(ageRating); 
    }


    // function to parse school:
    // school rating setter 
    function matchSchool(user1, user2) {
        if (user1["school"] === user2["school"]) {
             schoolRating = 10; 
        } else {
            schoolRating = 0; 
        }
        console.log(schoolRating);
      }

    // function to anaylze text of courses
    //course rating setter 
    function matchCourse(user1, user2) {
        let courses = user1.courses;
        for (let i = 0; i < courses.length; i ++) {
            let courseName = courses[i];
            if (user2.courses.includes(courseName)) {
                courseRating += 2;
            }
        }
        console.log(courseRating); 
    }
 
    // function to analyze about 
    // about rating setter 
    function matchAbout(user1, user2) {
        var aboutUser1 = analyzeEntities(user1["about"]);
        var stringCourses = aboutUser1.toString();
        var aboutUser2 = user2["about"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(aboutUser2[i])) {aboutRating += 1;}
        }

        console.log(matchRating); 
    }

    // function to analyze majors
    // major rating setter 
    function matchMajor(user1, user2) {
        var majorUser1 = analyzeEntities(user1["major"]);
        var stringCourses = majorUser1.toString();
        var majorUser2 = user2["major"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(majorUser2[i])) {majorRating += 2;}
        }
        console.log(majorRating); 
    }

    // analyze lookingFor
    // lookingFor rating setter 
    function matchlookingFor(user1, user2) {
        var lookingForUser1 = analyzeEntities(user1["lookingFor"]);
        var stringCourses = lookingForUser1.toString();
        var lookingForUser2 = user2["lookingFor"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(lookingForUser2[i])) {lookingForRating += 1;}
        }
        console.log(lookingForRating); 
    }

    function matchClub(user1, user2) {
        var clubUser1 = analyzeEntities(user1["clubs"]);
        var stringCourses = clubUser1.toString();
        var clubUser2 = user2["clubs"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(clubUser2[i])) {clubRating += 2;}
        }
        console.log(clubRating); 
    }
      
    function matchHometown(user1, user2) {
        var hometownUser1 = analyzeEntities(user1["hometown"]);
        var stringCourses = hometownUser1.toString();
        var hometownUser2 = user2["hometown"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(hometownUser2[i])) {hometownRating += 1;}
        }
        console.log(hometownRating);
    }

    function averageRating(user, users) {
        for (let i = 0; i < users.size(); i++) {
            const secondUser = users[i];
            matchCourse(user, secondUser);
            matchAge(user, secondUser);
            matchSchool(user, secondUser);
            matchAbout(user,secondUser); 
            matchMajor(user,secondUser); 
            matchlookingFor(user,secondUser); 
            matchClub(user, secondUser); 
            matchHometown(user, secondUser); 

            users[i].rating =  avg(ageRating + courseRating + 
                schoolRating + majorRating + aboutRating +
                 foodRating + clubRating + lookingForRating + hometownRating); 
        }
    }

// matchmaking profile triggers when new user is created. 

exports.makeMatch = functions.https.onCall(async (req, res) => {
    try {
        const uid = req.body.uid;

        // get current user
        const currentUser = await db.collection("users").doc(uid).get();
        //error
        if (!currentUser.exists) return res.status(400).send({ message: "Invalid user ID" });

        let allUsers = await db.collection("users").get();

        await averageRating(currentUser, allUsers); 
        
        res.send(allUsers);
    } catch (error) {
        res.status(400).send({ message: "oops" });
    }
});
