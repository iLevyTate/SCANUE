import { createAssistants } from './pfc.js';

class SCAN {
  constructor() {
    this.initialize();
  }

  async initialize() {
    this.agents = await createAssistants();
  }

  async processInput(input) {
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
    
    return this.unifyResults({...otherAgentOutputs, QLearning: qLearningOutput});
  }

  unifyResults(results) {
    return Object.entries(results)
      .map(([agent, output]) => `${agent}:\n${output}`)
      .join('\n\n');
  }
}

export default SCAN;