const ClientError = require('../exceptions/ClientError');

class PredictError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'PredictError';
  }
}

module.exports = PredictError;
