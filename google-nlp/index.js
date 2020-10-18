const NLP = require('google-nlp')
const APP_ID = "cstudents";
const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";

let nlp = new NLP(APP_KEY)

let text = "The quick brown fox jumped over the lazy dog"

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// [START language_quickstart]

nlp.analyzeEntities(text)
	.then(function( entities ) {
		// 	Output returned entities
		console.log( 'Entities:', entities );
	})
	.catch(function( error ) {
		// 	Error received, output the error
		console.log( 'Error:', error.message );
    })