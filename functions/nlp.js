const language = require('@google-cloud/language');
const { HttpsError } = require('firebase-functions/lib/providers/https');

const client = new language.LanguageServiceClient();

exports.analyzeEntities = async (text) => {
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

        const result = await client.analyzeEntities({ document: document });
        const entities = result.documentEntities;

        return entities;
    } catch (error) {
        throw new HttpsError('internal', error);
    }
};
