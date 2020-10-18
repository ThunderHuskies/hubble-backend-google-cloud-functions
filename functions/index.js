//const functions = require('firebase-functions');
const axios = require("axios");
const nlp = require("google-nlp");

const score = 0;

const API_KEY = "AIzaSyDVD8Y4heWlSMmtW9V-kishv2QJhvawj_c"

  /**
   * Sample JavaScript code for firestore.projects.databases.collectionGroups.fields.get
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/datastore"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey(API_KEY);
//     return gapi.client.load("https://firestore.googleapis.com/$discovery/rest?version=v1beta2")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.firestore.projects.databases.collectionGroups.fields.get({})
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });

// const NLP = require('google-nlp')
// const APP_ID = "cstudents";
// const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";

// let nlp = new NLP(APP_KEY)

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
// // [START language_quickstart]
