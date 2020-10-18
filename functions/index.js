
const functions = require('firebase-functions');
const NLP = require('google-nlp')
const APP_ID = "cstudents";
const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

let nlp = new NLP(APP_KEY)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// [START language_quickstart]


nlp.analyzeEntities( text ) 
	.then(function( entities ) {
		// 	Output returned entities
		console.log( 'Entities:', entities );
	})
	.catch(function( error ) {
		// 	Error received, output the error
		console.log( 'Error:', error.message );
    })

 
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
        if (user1["age"] == user2["age"]) {
            i["ageRating"] = 10; 
        } else if ((user1["age"] == user2["age"] + 1) || (user1["age"] == user2["age"] - 1 )) {
            i.ageRating = 8; 
        } else if ((user1["age"] == user2["age"] + 2) || (user1["age"] == user2["age"] - 2 )) {
            i.ageRating = 6; 
        } else if ((user1["age"] == user2["age"] + 3) || (user1["age"] == user2["age"] - 3 )) {
            i.ageRating = 4;
        } else if ((user1["age"] == user2["age"] + 4) || (user1["age"] == user2["age"] - 4)) {
            i.ageRating = 2; 
        }
        else if ((user1["age"] == user2["age"] + 5) || (user1["age"] == user2["age"] - 5)) {
            i.ageRating = 0; 
        }

        console.log(ageRating); 
    }


    // function to parse school:
    // school rating setter 
    function matchSchool(user1, user2) {
        if (user1["school"] == user2["school"]) {
             schoolRating = 10; 
        } else {
            schoolRating = 0; 
        }
        console.log(schoolRating);
      }

    // function to anaylze text of courses
    //course rating setter 
    function matchCourse(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["courses"]);
        var stringCourses = user1.toString();
        var user2 = user2["courses"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {courseRating += 1;}
        }

        console.log(courseRating); 
    }

 
    // function to analyze about 
    // about rating setter 
    function matchAbout(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["about"]);
        var stringCourses = user1.toString();
        var user2 = user2["about"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {aboutRating += 1;}
        }

        console.log(matchRating); 
    }

    // function to analyze majors
    // major rating setter 
    function matchMajor(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["major"]);
        var stringCourses = user1.toString();
        var user2 = user2["major"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {majorRating += 1;}
        }

        console.log(majorRating); 
    }

    // analyze lookingFor
    // lookingFor rating setter 
    function matchlookingFor(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["lookingFor"]);
        var stringCourses = user1.toString();
        var user2 = user2["lookingFor"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {lookingForRating += 1;}
        }
        console.log(lookingForRating); 
    }

      
    function matchClub(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["clubs"]);
        var stringCourses = user1.toString();
        var user2 = user2["clubs"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {lookingForRating += 1;}
        }
        console.log(clubRating); 
    }
      
    function matchHometown(user1, user2) {
        var user1 = nlp.analyzeEntities(user1["hometown"]);
        var stringCourses = user1.toString();
        var user2 = user2["hometown"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {hometownRating += 1;}
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
        if (!currentUser.exists) return res.status(400).send({ message: "Invalid user ID" });

        let allUsers = await db.collection("users").get();

        await averageRating(currentUser, allUsers); 

        res.send(allUsers);
    } catch (error) {
        res.status(400).send({ message: "oops" });
    }
});

