import { createAssistants } from './pfc.js';

class SCAN {
  constructor() {
    this.agents = null;
  }

  async initialize() {
    this.agents = await createAssistants();
  }

  async processInput(input) {
    try {
      if (!this.agents) {
        await this.initialize();
      }
      const otherAgentOutputs = {
        DLPFC: await this.agents.DLPFC.analyze(input),
        VMPFC: await this.agents.VMPFC.analyze(input),
        OFC: await this.agents.OFC.analyze(input),
        MPFC: await this.agents.MPFC.analyze(input),
        ACC: await this.agents.ACC.analyze(input),
      };
      const qLearningOutput = await this.agents.QLearning(input, otherAgentOutputs);
      const unifiedOutput = this.unifyResults({ ...otherAgentOutputs, QLearning: qLearningOutput });
      return unifiedOutput;
    } catch (error) {
      console.error('Error in processInput:', error);
      throw error;
    }
  }

  unifyResults(results) {
    return Object.entries(results)
      .map(([agent, output]) => `${agent}:\n${output}`)
      .join('\n\n');
  }
}

export default SCAN;