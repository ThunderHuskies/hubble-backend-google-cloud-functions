//const functions = require('firebase-functions');
const axios = require("axios");
const nlp = require("google-nlp");

const score = 0;

const API_KEY = "AIzaSyDVD8Y4heWlSMmtW9V-kishv2QJhvawj_c"


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
        if (i["age"] == i.age) {
            i["ageRating"] = 10; 
        } else if ((i.age == i.age + 1) || (user.age == i.age - 1 )) {
            i.ageRating = 8; 
        } else if ((user.age == i.age + 2) || (user.age == i.age - 2 )) {
            i.ageRating = 6; 
        } else if ((user.age == i.age + 3) || (user.age == i.age - 3 )) {
            i.ageRating = 4;
        } else if ((user.age == i.age + 4) || (user.age == i.age - 4)) {
            i.ageRating = 2; 
        }
        else if ((user.age == i.age + 5) || (user.age == i.age - 5)) {
            i.ageRating = 0; 
        }
    }


    // function to parse school:
    // school rating setter 
    function matchSchool(user1, user2) {
        if (user.school == i.school) {
             schoolRating = 1; 
        } else {
            schoolRating = 0; 
        }
      }

    // function to anaylze text of courses
    //course rating setter 
    function matchCourse(user1, user2) {
        var user1 = user1["courses"];
        var stringCourses = user1.toString();
        var user2 = user2["courses"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {courseRating += 1;}
        }
    }

 
    // function to analyze about 
    // about rating setter 
    function matchAbout(user1, user2) {
        var user1 = user1["about"];
        var stringCourses = user1.toString();
        var user2 = user2["about"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {aboutRating += 1;}
        }
    }

    // function to analyze majors
    // major rating setter 
    function matchMajor(user1, user2) {
        var user1 = user1["major"];
        var stringCourses = user1.toString();
        var user2 = user2["about"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {majorRating += 1;}
        }
    }

    // analyze lookingFor
    // lookingFor rating setter 
    function matchlookingFor(user1, user2) {
        var user1 = user1["lookingFor"];
        var stringCourses = user1.toString();
        var user2 = user2["lookingFor"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {lookingForRating += 1;}
        }
    }

      
    function matchClub(user1, user2) {
        var user1 = user1["club"];
        var stringCourses = user1.toString();
        var user2 = user2["club"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {lookingForRating += 1;}
        }
    }
      
    function matchHometown(user1, user2) {
        var user1 = user1["hometown"];
        var stringCourses = user1.toString();
        var user2 = user2["hometown"];
        for (var i = 0; i < user2.length; i++) {
            if (stringCourses.includes(user2[i])) {hometownRating += 1;}
        }
    }



    function averageRating(user, users) {
        for (let i = 1; i < users.size(); i++) {
            matchCourse(user, i);
            matchAge(user, i);
            matchSchool(user, i);
            matchAbout(user, i); 
            matchMajor(user,i); 
            matchlookingFor(user,i); 
            matchClub(user, i); 
            matchHometown(user, i); 

            i.rating =  avg(ageRating + courseRating + 
                schoolRating + majorRating + aboutRating +
                 foodRating + clubRating + lookingForRating + hometownRating); 
        }
    }





// matchmaking profile triggers when new user is created. 

exports.matchMake = functions.https.onCall((data) => {
     averageRating(data[0], data.slice(1)); 
});

