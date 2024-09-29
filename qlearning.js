import * as tf from '@tensorflow/tfjs';

class QNetwork {
  constructor(inputSize, outputSize) {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [inputSize], units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: outputSize, activation: 'linear' }),
      ],
    });
    this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  }

  predict(state) {
    return this.model.predict(tf.tensor2d([state]));
  }

  async train(state, target) {
    await this.model.fit(tf.tensor2d([state]), tf.tensor2d([target]), { epochs: 1 });
  }
}

class MultiAgentQLearning {
  constructor(stateSize, actionSize, learningRate = 0.05, discountFactor = 0.9, explorationRate = 0.2) {
    this.stateSize = stateSize;
    this.actionSize = actionSize;
    this.learningRate = learningRate;
    this.discountFactor = discountFactor;
    this.explorationRate = explorationRate;
    this.qNetworkOnline = new QNetwork(stateSize, actionSize);
    this.qNetworkTarget = new QNetwork(stateSize, actionSize);
    this.updateTargetNetwork();
  }

  async act(state) {
    if (Math.random() < this.explorationRate) {
      return Array(this.actionSize).fill(0).map(() => Math.random());
    } else {
      const qValues = await this.qNetworkOnline.predict(state);
      return Array.from(qValues.dataSync());
    }
  }

  async learn(state, actions, reward, nextState) {
    const qValuesNext = await this.qNetworkOnline.predict(nextState);
    const qValuesNextTarget = await this.qNetworkTarget.predict(nextState);
    const targetQValues = await this.qNetworkOnline.predict(state);
    const targetQValuesArray = Array.from(targetQValues.dataSync());
    for (let i = 0; i < this.actionSize; i++) {
      const targetQValue = reward + this.discountFactor * qValuesNextTarget.gather(tf.argMax(qValuesNext)).dataSync()[0];
      targetQValuesArray[i] = actions[i] * targetQValue + (1 - actions[i]) * targetQValuesArray[i];
    }
    await this.qNetworkOnline.train(state, targetQValuesArray);
  }

  updateTargetNetwork() {
    this.qNetworkTarget.model.setWeights(this.qNetworkOnline.model.getWeights());
  }
}

export { MultiAgentQLearning };