import { Assistant } from 'experts';
import OpenAI from 'openai';
import { MultiAgentQLearning } from './qlearning.js';
import { refinedWordLists } from './refinedWordLists.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class PFCAssistant extends Assistant {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async analyze(input) {
    try {
      const response = await openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.instructions },
          { role: 'user', content: input },
        ],
        temperature: this.config.temperature,
      });
      return response.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`Error in ${this.config.name}.analyze: ${error.message}`);
    }
  }
}

// Factory function to create an assistant
const createAssistant = async (config) => {
  try {
    const assistant = await Assistant.create(config);
    return new PFCAssistant(assistant);
  } catch (error) {
    throw new Error(`Error creating ${config.name}: ${error.message}`);
  }
};

// DLPFCAssistant example
class DLPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'DLPFC Assistant',
      instructions: `You are an expert on the Dorsolateral Prefrontal Cortex (DLPFC). Focus on executive functions, working memory, and cognitive control. Provide insights on task complexity, attention allocation, and goal-directed behavior.`,
      model: 'gpt-4o-mini-2024-07-18',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }
}

// Repeat for VMPFCAssistant, OFC, MPFC, ACC, and QLearningAssistant
class VMPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'VMPFC Assistant',
      instructions: `You are an expert on the Ventromedial Prefrontal Cortex (VMPFC). Focus on emotion regulation, decision-making, and value-based choices. Provide insights on risk assessment, social context, and personal relevance.`,
      model: 'gpt-4o-mini-2024-07-18',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }
}

class OFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'OFC Assistant',
      instructions: `You are an expert on the Orbitofrontal Cortex (OFC). Focus on reward processing, expectation, and adaptive behavior.`,
      model: 'gpt-4o-mini-2024-07-18',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }
}

class MPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'MPFC Assistant',
      instructions: `You are an expert on the Medial Prefrontal Cortex (MPFC). Focus on social cognition, self-referential processing, and theory of mind.`,
      model: 'gpt-4o-mini-2024-07-18',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }
}

class ACCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'ACC Assistant',
      instructions: `You are an expert on the Anterior Cingulate Cortex (ACC). Focus on conflict monitoring, error detection, and cognitive control.`,
      model: 'gpt-4o-mini-2024-07-18',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }
}

class QLearningAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: "Q-Learning Assistant",
      instructions: `You are an expert in reinforcement learning and prefrontal cortex functions. Analyze inputs to provide strategies for decision-making and learning in multi-agent environments. Focus on how agents representing different PFC regions can learn optimal policies through trial and error. Provide insights on exploration vs exploitation, value function approximation, and policy improvement in the context of PFC functions.`,
      model: "gpt-4o-mini-2024-07-18",
      tools: [{ type: "code_interpreter" }, { type: "file_search" }],
      temperature: 0.7,
    };
    return createAssistant(config);
  }

  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "Q-Learning Assistant",
      instructions: `You are an expert in reinforcement learning and prefrontal cortex functions. Analyze inputs to provide strategies for decision-making and learning in multi-agent environments. Focus on how agents representing different PFC regions can learn optimal policies through trial and error. Provide insights on exploration vs exploitation, value function approximation, and policy improvement in the context of PFC functions.`,
      model: "gpt-4o-mini-2024-07-18",
      tools: [{ type: "code_interpreter" }, { type: "file_search" }],
      temperature: 0.7,
    });
    this.qlearning = new MultiAgentQLearning(30, 5);
  }

  async analyze(input, otherAgentOutputs) {
    try {
      const state = this.preprocessInput(input, otherAgentOutputs);
      const actions = await this.qlearning.act(state);
      const combinedOutput = this.combineOutputs(otherAgentOutputs, actions);
      const nextState = this.simulateEnvironment(state, actions);
      const reward = this.calculateReward(state, actions, nextState, combinedOutput);
      await this.qlearning.learn(state, actions, reward, nextState);
      return combinedOutput;
    } catch (error) {
      console.error("Error in QLearningAssistant.analyze:", error);
      throw error;
    }
  }

  preprocessInput(input, otherAgentOutputs) {
    const baseFeatures = this.extractInputFeatures(input);
    const agentFeatures = this.extractFeaturesFromAgentOutputs(otherAgentOutputs);
    return [...baseFeatures, ...agentFeatures];
  }

  extractInputFeatures(input) {
    const features = {
      DLPFC: {
        taskComplexity: 0,
        workingMemoryLoad: 0,
        attentionLevel: 0,
        goalProgress: 0,
        cognitiveControl: 0,
      },
      VMPFC: {
        emotionalValence: 0,
        riskLevel: 0,
        socialContext: 0,
        personalRelevance: 0,
        anticipatedOutcome: 0,
      },
      OFC: {
        rewardMagnitude: 0,
        rewardProbability: 0,
        rewardDelay: 0,
        punishmentMagnitude: 0,
        alternativeOptions: 0,
      },
      MPFC: {
        socialCueStrength: 0,
        selfRelevance: 0,
        mentalizing: 0,
        perspectiveTaking: 0,
        socialNormAdherence: 0,
      },
      ACC: {
        conflictLevel: 0,
        errorLikelihood: 0,
        taskDifficulty: 0,
        performanceFeedback: 0,
        adaptationRequired: 0,
      },
    };

    const tokens = input.toLowerCase().split(/\s+/);
    const wordCount = tokens.length;
    this.extractDLPFCFeatures(features.DLPFC, tokens, wordCount);
    this.extractVMPFCFeatures(features.VMPFC, tokens, wordCount);
    this.extractOFCFeatures(features.OFC, tokens, wordCount);
    this.extractMPFCFeatures(features.MPFC, tokens, wordCount);
    this.extractACCFeatures(features.ACC, tokens, wordCount);
    return Object.values(features).flatMap(region => Object.values(region));
  }

  extractDLPFCFeatures(features, tokens, wordCount) {
    features.taskComplexity = Math.min(wordCount / 20, 1);
    features.workingMemoryLoad = this.countUniqueWords(tokens) / wordCount;
    features.attentionLevel = this.countWordsFromList(tokens, refinedWordLists.focus) / wordCount;
    features.goalProgress = this.countWordsFromList(tokens, refinedWordLists.progress) / wordCount;
    features.cognitiveControl = this.countWordsFromList(tokens, refinedWordLists.control) / wordCount;
  }

  extractVMPFCFeatures(features, tokens, wordCount) {
    features.emotionalValence = this.calculateSentiment(tokens);
    features.riskLevel = this.countWordsFromList(tokens, refinedWordLists.risk) / wordCount;
    features.socialContext = this.countWordsFromList(tokens, refinedWordLists.social) / wordCount;
    features.personalRelevance = this.countWordsFromList(tokens, refinedWordLists.personal) / wordCount;
    features.anticipatedOutcome = this.countWordsFromList(tokens, refinedWordLists.outcome) / wordCount;
  }

  extractOFCFeatures(features, tokens, wordCount) {
    features.rewardMagnitude = this.countWordsFromList(tokens, refinedWordLists.reward) / wordCount;
    features.rewardProbability = this.countWordsFromList(tokens, refinedWordLists.probability) / wordCount;
    features.rewardDelay = this.countWordsFromList(tokens, refinedWordLists.time) / wordCount;
    features.punishmentMagnitude = this.countWordsFromList(tokens, refinedWordLists.punishment) / wordCount;
    features.alternativeOptions = this.countWordsFromList(tokens, refinedWordLists.options) / wordCount;
  }

  extractMPFCFeatures(features, tokens, wordCount) {
    features.socialCueStrength = this.countWordsFromList(tokens, refinedWordLists.socialCues) / wordCount;
    features.selfRelevance = this.countWordsFromList(tokens, refinedWordLists.personal) / wordCount;
    features.mentalizing = this.countWordsFromList(tokens, refinedWordLists.mentalizing) / wordCount;
    features.perspectiveTaking = this.countWordsFromList(tokens, refinedWordLists.perspective) / wordCount;
    features.socialNormAdherence = this.countWordsFromList(tokens, refinedWordLists.norms) / wordCount;
  }

  extractACCFeatures(features, tokens, wordCount) {
    features.conflictLevel = this.countWordsFromList(tokens, refinedWordLists.conflict) / wordCount;
    features.errorLikelihood = this.countWordsFromList(tokens, refinedWordLists.error) / wordCount;
    features.taskDifficulty = features.taskComplexity;
    features.performanceFeedback = this.countWordsFromList(tokens, refinedWordLists.feedback) / wordCount;
    features.adaptationRequired = this.countWordsFromList(tokens, refinedWordLists.adaptation) / wordCount;
  }

  countUniqueWords(tokens) {
    return new Set(tokens).size;
  }

  countWordsFromList(tokens, wordList) {
    return tokens.filter(token => wordList.includes(token)).length;
  }

  calculateSentiment(tokens) {
    const positiveCount = this.countWordsFromList(tokens, refinedWordLists.positive);
    const negativeCount = this.countWordsFromList(tokens, refinedWordLists.negative);
    return (positiveCount - negativeCount) / tokens.length;
  }

  extractFeaturesFromAgentOutputs(otherAgentOutputs) {
    return Object.values(otherAgentOutputs).map(output => output.length / 1000);
  }

  combineOutputs(otherAgentOutputs, actions) {
    const weights = actions.map(action => Math.exp(action));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const normalizedWeights = totalWeight > 0 ? weights.map(w => w / totalWeight) : weights.map(() => 1 / weights.length);
    const regionOrder = ['DLPFC', 'VMPFC', 'OFC', 'MPFC', 'ACC'];
    const sortedRegions = regionOrder.sort((a, b) => normalizedWeights[regionOrder.indexOf(b)] - normalizedWeights[regionOrder.indexOf(a)]);
    let output = "Integrated PFC Analysis and Action Plan\n\n";
    output += "1. Situation Overview:\n";
    output += this.generateSituationOverview(otherAgentOutputs, sortedRegions);
    output += "\n\n2. Key Considerations:\n";
    output += this.generateKeyConsiderations(otherAgentOutputs, sortedRegions);
    output += "\n\n3. Action Steps:\n";
    output += this.generateActionSteps(otherAgentOutputs, sortedRegions);
    output += "\n\n4. Potential Challenges:\n";
    output += this.generatePotentialChallenges(otherAgentOutputs, sortedRegions);
    output += "\n\n5. Long-term Outlook:\n";
    output += this.generateLongTermOutlook(otherAgentOutputs, sortedRegions);
    return output;
  }

  generateSituationOverview(otherAgentOutputs, sortedRegions) {
    return sortedRegions.slice(0, 3).map(region => this.extractKeyPoint(otherAgentOutputs[region])).join(" ");
  }

  generateKeyConsiderations(otherAgentOutputs, sortedRegions) {
    return sortedRegions.map(region => `- ${this.getRegionFocus(region)}: ${this.extractKeyPoint(otherAgentOutputs[region])}`).join("\n");
  }

  generateActionSteps(otherAgentOutputs, sortedRegions) {
    return sortedRegions.slice(0, 3).map((region, index) => `${index + 1}. ${this.getActionStep(region, otherAgentOutputs[region])}`).join("\n");
  }

  generatePotentialChallenges(otherAgentOutputs, sortedRegions) {
    return sortedRegions.slice(-2).map(region => `- ${this.getChallengeFromRegion(region, otherAgentOutputs[region])}`).join("\n");
  }

  generateLongTermOutlook(otherAgentOutputs, sortedRegions) {
    const primaryRegion = sortedRegions[0];
    return this.getLongTermOutlook(primaryRegion, otherAgentOutputs[primaryRegion]);
  }

  extractKeyPoint(output) {
    const sentences = output.split('.');
    return sentences[0].trim() + '.';
  }

  getRegionFocus(region) {
    switch (region) {
      case 'DLPFC':
        return "Executive Function";
      case 'VMPFC':
        return "Emotional Regulation";
      case 'OFC':
        return "Reward Processing";
      case 'MPFC':
        return "Social Cognition";
      case 'ACC':
        return "Conflict Monitoring";
      default:
        return "General Consideration";
    }
  }

  getActionStep(region, output) {
    const keyPoint = this.extractKeyPoint(output);
    switch (region) {
      case 'DLPFC':
        return `Implement a structured approach: ${keyPoint}`;
      case 'VMPFC':
        return `Prioritize emotional well-being: ${keyPoint}`;
      case 'OFC':
        return `Consider potential rewards and consequences: ${keyPoint}`;
      case 'MPFC':
        return `Consider social implications: ${keyPoint}`;
      case 'ACC':
        return `Monitor for conflicts and adjust strategy: ${keyPoint}`;
      default:
        return `Consider the following: ${keyPoint}`;
    }
  }

  getChallengeFromRegion(region, output) {
    const keyPoint = this.extractKeyPoint(output);
    switch (region) {
      case 'DLPFC':
        return `Maintaining focus and organization: ${keyPoint}`;
      case 'VMPFC':
        return `Balancing emotions with rational decision-making: ${keyPoint}`;
      case 'OFC':
        return `Avoiding impulsive choices based on immediate rewards: ${keyPoint}`;
      case 'MPFC':
        return `Navigating complex social dynamics: ${keyPoint}`;
      case 'ACC':
        return `Resolving conflicts and adapting to changes: ${keyPoint}`;
      default:
        return `Potential challenge: ${keyPoint}`;
    }
  }

  getLongTermOutlook(region, output) {
    const keyPoint = this.extractKeyPoint(output);
    switch (region) {
      case 'DLPFC':
        return `With consistent application of executive functions, expect improved organization and goal achievement. ${keyPoint}`;
      case 'VMPFC':
        return `By managing emotions effectively, anticipate improved decision-making and well-being. ${keyPoint}`;
      case 'OFC':
        return `By considering long-term rewards, expect more balanced and fulfilling choices. ${keyPoint}`;
      case 'MPFC':
        return `By honing social cognition, anticipate improved relationships and social standing. ${keyPoint}`;
      case 'ACC':
        return `With enhanced conflict monitoring, expect smoother adaptation to challenges and consistent progress. ${keyPoint}`;
      default:
        return `Long-term outlook: ${keyPoint}`;
    }
  }

  simulateEnvironment(state, actions) {
    return state.map(s => s + Math.random() * 0.1 - 0.05);
  }

  calculateReward(state, actions, nextState, combinedOutput) {
    const outputLength = combinedOutput.length / 1000;
    const stateChange = nextState.reduce((sum, s, i) => sum + Math.abs(s - state[i]), 0);
    const actionDiversity = new Set(actions).size / actions.length;
    const reward = outputLength * 0.5 + stateChange * 0.3 + actionDiversity * 0.2;
    return Math.tanh(reward);
  }

  async learn(state, actions, reward, nextState) {
    const qValuesNext = await this.qlearning.qNetworkOnline.predict(nextState);
    const qValuesNextTarget = await this.qlearning.qNetworkTarget.predict(nextState);
    const targetQValues = await this.qlearning.qNetworkOnline.predict(state);
    const targetQValuesArray = Array.from(targetQValues.dataSync());
    for (let i = 0; i < this.qlearning.actionSize; i++) {
      const targetQValue = reward + this.qlearning.discountFactor * qValuesNextTarget.gather(tf.argMax(qValuesNext)).dataSync()[0];
      targetQValuesArray[i] = actions[i] * targetQValue + (1 - actions[i]) * targetQValuesArray[i];
    }
    await this.qlearning.qNetworkOnline.train(state, targetQValuesArray);
  }

  updateTargetNetwork() {
    this.qlearning.qNetworkTarget.model.setWeights(this.qlearning.qNetworkOnline.model.getWeights());
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
    const qLearningOutput = await this.analyze(input, otherAgentOutputs);
    return this.unifyResults({ ...otherAgentOutputs, QLearning: qLearningOutput });
  }

  unifyResults(results) {
    return Object.entries(results)
      .map(([agent, output]) => `${agent}:\n${output}`)
      .join('\n\n');
  }
}

// Ensure you export the class if it's in a separate file
export { QLearningAssistant };

// In createAssistants function
const createAssistants = async () => {
  try {
    const dlpfc = await DLPFCAssistant.createInstance();
    const vmpfc = await VMPFCAssistant.createInstance();
    const ofc = await OFCAssistant.createInstance();
    const mpfc = await MPFCAssistant.createInstance();
    const acc = await ACCAssistant.createInstance();
    const qlearning = await QLearningAssistant.createInstance(); // Ensure this is correct
    return {
      DLPFC: dlpfc,
      VMPFC: vmpfc,
      OFC: ofc,
      MPFC: mpfc,
      ACC: acc,
      QLearning: async (input) => {
        const otherAgentOutputs = {
          DLPFC: await dlpfc.analyze(input),
          VMPFC: await vmpfc.analyze(input),
          OFC: await ofc.analyze(input),
          MPFC: await mpfc.analyze(input),
          ACC: await acc.analyze(input),
        };
        return qlearning.analyze(input, otherAgentOutputs);
      },
    };
  } catch (error) {
    console.error("Error creating assistants:", error);
    throw error;
  }
};

export { createAssistants };