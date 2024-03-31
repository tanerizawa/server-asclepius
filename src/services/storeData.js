const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
  });

  const predictCollection = db.collection('Predictions');
  return await predictCollection.doc(id).set(data);
}

module.exports = storeData;
