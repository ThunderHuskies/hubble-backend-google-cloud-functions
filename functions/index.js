const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { analyzeEntities } = require('./nlp');
const { HttpsError } = require('firebase-functions/lib/providers/https');

admin.initializeApp();

const db = admin.firestore();

// assign rating for other users based on user
exports.findMatches = functions.https.onRequest(async (req, res) => {
    try {
        const uid = req.body.uid;
        await Promise.all([
            db.collection('users').doc(uid).get(),
            db.collection('users').get(),
        ]).then(([currentUser, allUsers]) => {
            if (!currentUser || !allUsers)
                throw new HttpsError('failed-precondition', 'No users found');

            const usersWithRatings = calculateRelativeUserRatings(
                currentUser.data(),
                allUsers,
            );

            return res.send(usersWithRatings);
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
        throw new HttpsError('internal', error);
    }
});

function calculateRelativeUserRatings(currentUser, otherUsers) {
    try {
        const users = [];
        otherUsers.forEach((otherUser) => {
            if (
                currentUser.name === otherUser.name &&
                currentUser.phone === otherUser.phone
            ) {
                return;
            }
            let data = otherUser.data();
            data.uid = otherUser.id;
            users.push(data);
        });

        const ratedUsers = [];

        for (const user of users) {
            const r1 = getRelativeCourseRating(currentUser, user) * 8;
            const r2 = getAgeRating(currentUser, user);
            const r3 = getSchoolRating(currentUser, user);
            const r4 = getMajorRating(currentUser, user) * 24;
            const r6 = getClubRating(currentUser, user) * 12;
            const r7 = getHometownRating(currentUser, user) * 4;
            const r8 = getAboutUsRating(currentUser, user) * 4; 
            const r9 = getLookingForRating(currentUser, user) * 16; 
            user.rating = (r1 + r2 + r3 + r4 + r6 + r7 + r8 + r9) / 8;

            ratedUsers.push(user);
        }

        return ratedUsers;
    } catch (error) {
        throw new HttpsError('internal', error);
    }
}

function getAgeRating(user1, user2) {
    return (ageRating = Math.max(10 - Math.abs(user1.age - user2.age) * 2, 0));
}

function getSchoolRating(user1, user2) {
    var schoolRating = 0;
    if (user1['school'] === user2['school']) {
        schoolRating = 10;
    } else {
        schoolRating = 0;
    }
    return schoolRating;
}

function getRelativeCourseRating(user1, user2) {
    var courseRating = 0;
    let courses = user1.courses;
    for (let i = 0; i < courses.length; i++) {
        let courseName = courses[i];
        if (user2.courses.includes(courseName)) {
            courseRating += 2;
        }
    }
    return courseRating;
}

function getAboutUsRating(user1, user2) {
    var aboutRating = 0;
    var aboutUser1 = analyzeEntities(user1['hobbies']);
    var stringHobbies = aboutUser1.toString();
    var aboutUser2 = user2['hobbies'];
    for (var i = 0; i < user2.length; i++) {
        if (stringHobbies.includes(aboutUser2[i])) {
            aboutRating += 1;
        }
    }
    return aboutRating;
}

function getMajorRating(user1, user2) {
    var majorRating = 0;
    var majorUser1 = analyzeEntities(user1['major']);
    var stringMajor = majorUser1.toString();
    var majorUser2 = user2['major'];
    for (var i = 0; i < user2.length; i++) {
        if (stringMajor.includes(majorUser2[i])) {
            majorRating += 2;
        }
    }
    return majorRating;
}

function getLookingForRating(user1, user2) {
    var lookingForRating = 0;
    var lookingForUser1 = analyzeEntities(user1['lookingFor']);
    var stringCourses = lookingForUser1.toString().toLowerCase();
    var lookingForUser2 = user2['lookingFor'];
    for (var i = 0; i < user2.length; i++) {
        if (stringCourses.includes(lookingForUser2[i])) {
            lookingForRating += 1;
        }
    }
    return lookingForRating;
}

function getClubRating(user1, user2) {
    var clubRating = 0;
    var clubUser1 = analyzeEntities(user1['clubs']);
    var stringCourses = clubUser1.toString().toLowerCase();
    var clubUser2 = user2['clubs'];
    for (var i = 0; i < user2.length; i++) {
        if (stringCourses.includes(clubUser2[i])) {
            clubRating += 2;
        }
    }
    return clubRating;
}

function getHometownRating(user1, user2) {
    var hometownRating = 0;
    var hometownUser1 = analyzeEntities(user1['hometown']);
    var stringCourses = hometownUser1.toString().toLowerCase();
    var hometownUser2 = user2['hometown'];
    for (var i = 0; i < user2.length; i++) {
        if (stringCourses.includes(hometownUser2[i].name.toLowerCase())) {
            hometownRating += 1;
        }
    }
    return hometownRating;
}
