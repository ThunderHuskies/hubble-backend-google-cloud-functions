const functions = require('firebase-functions');
const APP_ID = "cstudents";
const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";
const admin = require('firebase-admin');
const { analyzeEntities } = require("./nlp")

admin.initializeApp();

const db = admin.firestore();

    // assigns rating based on the difference in age compared to the user.
    function matchAge(user1, user2) {
        return ageRating = Math.max(10 - Math.abs(user1.age - user2.age) * 2, 0);
    }


    // assign rating if user goes to same school
    function matchSchool(user1, user2) {
        var schoolRating = 0; 
        if (user1["school"] === user2["school"]) {
             schoolRating = 10; 
        } else {
            schoolRating = 0; 
        }
        return schoolRating; 
      }

    // assigns course rating based on other users course similarties to user 
    function matchCourse(user1, user2) {
        var courseRating = 0; 
        let courses = user1.courses;
        for (let i = 0; i < courses.length; i ++) {
            let courseName = courses[i];
            if (user2.courses.includes(courseName)) {
                courseRating += 2;
            }
        }
        return courseRating; 
    }
 
    // assigns aboutRating based on others users "about us" similarties to user
    function matchAbout(user1, user2) {
        var aboutRating = 0; 
        var aboutUser1 = analyzeEntities(user1["about"]);
        var stringCourses = aboutUser1.toString();
        var aboutUser2 = user2["about"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(aboutUser2[i])) {aboutRating += 1;}
        }
        return aboutRating; 
    }

    // assigns majorRating based on if user is in the same major as user
    function matchMajor(user1, user2) {
        var majorRating = 0; 
        var majorUser1 = analyzeEntities(user1["major"]);
        var stringCourses = majorUser1.toString();
        var majorUser2 = user2["major"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(majorUser2[i])) {majorRating += 2;}
        }
        return majorRating; 
    }

    
    // assigns lookingForRating based on if users are looking for same thing 
    function matchlookingFor(user1, user2) {
        var lookingForRating = 0;
        var lookingForUser1 = analyzeEntities(user1["lookingFor"]);
        var stringCourses = lookingForUser1.toString().toLowerCase();
        var lookingForUser2 = user2["lookingFor"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(lookingForUser2[i])) {lookingForRating += 1;}
        }
        return lookingForRating; 
    }

    // assigns clubRating based on if users are in the same club as user 
    function matchClub(user1, user2) {
        var clubRating = 0; 
        var clubUser1 = analyzeEntities(user1["clubs"]);
        var stringCourses = clubUser1.toString.toLowerCase();
        var clubUser2 = user2["clubs"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(clubUser2[i])) {clubRating += 2;}
        }
        return clubRating; 
    }
    
    // assigns hometownRating based on if users are in the same hometown as user
    function matchHometown(user1, user2) {
        var hometownRating = 0; 
        var hometownUser1 = analyzeEntities(user1["hometown"]);
        var stringCourses = hometownUser1.toString().toLowerCase();
        var hometownUser2 = user2["hometown"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(hometownUser2[i].name.toLowerCase())) {hometownRating += 1;}
        }
        return hometownRating; 
    }

    // calculate ratings for users
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

exports.makeMatch = functions.https.onCall(async (req, res) => {
    try {
        const uid = req.body.uid;

        const currentUser = await db.collection("users").doc(uid).get();
        if (!currentUser.exists) return res.status(400).send({ message: "Invalid user ID" });

        let allUsers = await db.collection("users").get();

        await averageRating(currentUser, allUsers); 
        
        res.send(allUsers);
    } catch (error) {
        res.status(400).send({ message: "oops" });
    }
});
