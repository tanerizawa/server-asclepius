const tf = require('@tensorflow/tfjs-node');
const PredictError = require('../exceptions/PredictError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    const prediction = model.predict(tensor);
    const score = await prediction.data();

    let label, suggestion;
    if (score > 0.5) {
      label = 'Cancer';
      suggestion = 'Segera periksa ke dokter!';
    } else {
      label = 'Non-cancer';
      suggestion = 'Jaga kesehatanmu!';
    }
    return { label, suggestion };
  } catch (error) {
    throw new PredictError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

module.exports = predictClassification;
