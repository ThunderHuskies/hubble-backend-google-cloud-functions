const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient(); 

exports.anaylzeEntites = async (text) => {
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
          };

          //detects Text entities 
          const [result] = await client.analyzeEntities({document: document}); 
          const entities = result.documentEntities; 

          console.log(text); 
          console.log(entities); 

    } catch (error) {
        console.log(error.message); 
    }
}


