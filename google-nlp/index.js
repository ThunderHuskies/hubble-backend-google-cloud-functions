const NLP = require('google-nlp')
const APP_ID = "cstudents";
const APP_KEY = "AIzaSyCxLD3cVdT-gAFOg1RBlvqv44EFXaZZMKE";

let nlp = new NLP(APP_KEY)

let text = "Computer Science student who loves long walks on the beach and tequila sunrises"
let entry1 = 5;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// [START language_quickstart]

	//finds named entries (proper names and common nouns)
nlp.analyzeEntities(text)
	.then(function( entities ) {
	// 	Output returned entities
	//parsing and adding just the name entries into the firebase database
	for (var i =0; i < entities.entities.length; i ++){
		console.log(entities['entities'][i]["name"]);
	}
})
.catch(function( error ) {
	// 	Error received, output the error
	console.log( 'Error:', error.message );
})

//classifies the text into categories
// nlp.classifyText(text)
// 	.then(function( categories ){
// 	console.log("Categories:", categories);
// }).catch(function(error) {
// 	console.log("Error:", error.message);
// }) 
