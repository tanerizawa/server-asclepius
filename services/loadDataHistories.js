const { Firestore } = require('@google-cloud/firestore');

async function loadDataHistories() {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
  });

  const predictCollection = db.collection('Predictions');
  const snapshots = await predictCollection.orderBy('createdAt', 'desc').get();
  if (snapshots.empty) return new Array([]);

  const predictions = [];
  snapshots.forEach((doc) => {
    const prediction = {
      id: doc.id,
      history: doc.data(),
    };
    predictions.push(prediction);
  });

  return predictions;
}

module.exports = loadDataHistories;
