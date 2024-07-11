import { createAssistants } from './pfc.js';

class SCAN {
  constructor() {
    this.initialize();
  }

  async initialize() {
    this.agents = await createAssistants();
  }

  async processInput(input) {
    // Ensure agents are initialized before processing input
    if (!this.agents) {
      await this.initialize();
    }
    
    // Process input through each agent
    const results = await Promise.all(Object.values(this.agents).map(agent => agent.analyze(input)));
    return this.unifyResults(results);
  }

  unifyResults(results) {
    // Combine results from all agents into a single output
    return results.join(' ');
  }
}

// Example usage
(async () => {
  const scan = new SCAN();
  const input = "Example input text";
  const output = await scan.processInput(input);
  console.log(output);
})();

export default SCAN;
