import { Assistant, Thread } from "experts";
import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

class DLPFCAssistant extends Assistant {
  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "DLPFC Assistant",
      instructions: `You are an expert in planning and prioritization, simulating the Dorsolateral Prefrontal Cortex. 
        Analyze inputs to provide strategies for effective planning, task prioritization, and goal-directed behavior. 
        Focus on executive functions such as working memory, cognitive flexibility, and problem-solving. 
        Provide structured, step-by-step approaches to complex tasks and decision-making processes.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.7
    });
  }

  static async createInstance() {
    const assistant = await Assistant.create({
      name: "DLPFC Assistant",
      instructions: `You are an expert in planning and prioritization, simulating the Dorsolateral Prefrontal Cortex. 
        Analyze inputs to provide strategies for effective planning, task prioritization, and goal-directed behavior. 
        Focus on executive functions such as working memory, cognitive flexibility, and problem-solving. 
        Provide structured, step-by-step approaches to complex tasks and decision-making processes.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.7
    });
    return new DLPFCAssistant(assistant);
  }

  async analyze(input) {
    const thread = await Thread.create();
    const response = await this.ask(input, thread.id);
    return response;
  }
}

class VMPFCAssistant extends Assistant {
  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "VMPFC Assistant",
      instructions: `You are an expert in evaluating risks and emotional impact, simulating the Ventromedial Prefrontal Cortex. 
        Analyze inputs to provide insights on potential risks, emotional consequences, and decision-making in uncertain situations. 
        Focus on integrating emotional and social information into decision-making processes. 
        Evaluate potential outcomes and their associated emotional impacts.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.6
    });
  }

  static async createInstance() {
    const assistant = await Assistant.create({
      name: "VMPFC Assistant",
      instructions: `You are an expert in evaluating risks and emotional impact, simulating the Ventromedial Prefrontal Cortex. 
        Analyze inputs to provide insights on potential risks, emotional consequences, and decision-making in uncertain situations. 
        Focus on integrating emotional and social information into decision-making processes. 
        Evaluate potential outcomes and their associated emotional impacts.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.6
    });
    return new VMPFCAssistant(assistant);
  }

  async analyze(input) {
    const thread = await Thread.create();
    const response = await this.ask(input, thread.id);
    return response;
  }
}

class OFCAssistant extends Assistant {
  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "OFC Assistant",
      instructions: `You are an expert in assessing rewards and positive outcomes, simulating the Orbitofrontal Cortex. 
        Analyze inputs to provide insights on potential benefits, positive results, and reward-based decision-making. 
        Focus on evaluating the value of different choices and predicting future outcomes. 
        Consider both immediate and long-term rewards in your analysis.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.5
    });
  }

  static async createInstance() {
    const assistant = await Assistant.create({
      name: "OFC Assistant",
      instructions: `You are an expert in assessing rewards and positive outcomes, simulating the Orbitofrontal Cortex. 
        Analyze inputs to provide insights on potential benefits, positive results, and reward-based decision-making. 
        Focus on evaluating the value of different choices and predicting future outcomes. 
        Consider both immediate and long-term rewards in your analysis.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.5
    });
    return new OFCAssistant(assistant);
  }

  async analyze(input) {
    const thread = await Thread.create();
    const response = await this.ask(input, thread.id);
    return response;
  }
}

class MPFCAssistant extends Assistant {
  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "MPFC Assistant",
      instructions: `You are an expert in social intentions and relationships, simulating the Medial Prefrontal Cortex. 
        Analyze inputs to provide insights on social dynamics, interpersonal strategies, and self-referential thinking. 
        Focus on understanding and predicting others' mental states, intentions, and behaviors. 
        Provide guidance on navigating complex social situations and improving interpersonal relationships.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.6
    });
  }

  static async createInstance() {
    const assistant = await Assistant.create({
      name: "MPFC Assistant",
      instructions: `You are an expert in social intentions and relationships, simulating the Medial Prefrontal Cortex. 
        Analyze inputs to provide insights on social dynamics, interpersonal strategies, and self-referential thinking. 
        Focus on understanding and predicting others' mental states, intentions, and behaviors. 
        Provide guidance on navigating complex social situations and improving interpersonal relationships.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.6
    });
    return new MPFCAssistant(assistant);
  }

  async analyze(input) {
    const thread = await Thread.create();
    const response = await this.ask(input, thread.id);
    return response;
  }
}

class ACCAssistant extends Assistant {
  constructor(existingAssistant = null) {
    super(existingAssistant || {
      name: "ACC Assistant",
      instructions: `You are the coordinator of the Prefrontal Cortex system, simulating the Anterior Cingulate Cortex. 
        Synthesize inputs from other assistants to provide a comprehensive analysis. 
        Focus on conflict monitoring, error detection, and cognitive control. 
        Integrate information from various sources to guide decision-making and behavior.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.7
    });
  }

  static async createInstance() {
    const assistant = await Assistant.create({
      name: "ACC Assistant",
      instructions: `You are the coordinator of the Prefrontal Cortex system, simulating the Anterior Cingulate Cortex. 
        Synthesize inputs from other assistants to provide a comprehensive analysis. 
        Focus on conflict monitoring, error detection, and cognitive control. 
        Integrate information from various sources to guide decision-making and behavior.`,
      model: "gpt-4-0125-preview",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ],
      temperature: 0.7
    });
    return new ACCAssistant(assistant);
  }

  async analyze(inputText) {
    const thread = await Thread.create();
    const response = await this.ask(inputText, thread.id);
    return response;
  }
}

const createAssistants = async () => {
  const dlpfc = await DLPFCAssistant.createInstance();
  const vmpfc = await VMPFCAssistant.createInstance();
  const ofc = await OFCAssistant.createInstance();
  const mpfc = await MPFCAssistant.createInstance();
  const acc = await ACCAssistant.createInstance();
  
  return {
    DLPFC: dlpfc,
    VMPFC: vmpfc,
    OFC: ofc,
    MPFC: mpfc,
    ACC: acc
  };
};

export { DLPFCAssistant, VMPFCAssistant, OFCAssistant, MPFCAssistant, ACCAssistant, createAssistants };
