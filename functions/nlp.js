const language = require("@google-cloud/language");

const client = new language.LanguageServiceClient();

exports.anaylzeEntites = async (text) => {
  try {
    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };

    const [result] = await client.analyzeEntities({ document: document });
    const entities = result.documentEntities;

  } catch (error) {
    throw new Error();
  }
};
