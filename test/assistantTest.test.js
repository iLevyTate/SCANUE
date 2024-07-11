import { expect } from 'chai';
import { DLPFCAssistant, VMPFCAssistant, OFCAssistant, MPFCAssistant, ACCAssistant, createAssistants } from '../pfc.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Assistant Tests', function() {
  this.timeout(60000); // Increase the timeout to 60 seconds

  describe('DLPFCAssistant', function() {
    it('should provide planning and prioritization strategies', async function() {
      const assistant = await DLPFCAssistant.createInstance();
      const response = await assistant.analyze('How do I manage my time better?');
      expect(response).to.be.a('string');
      expect(response).to.match(/strategies/i);
    });
  });

  describe('VMPFCAssistant', function() {
    it('should evaluate risks and emotional impact', async function() {
      const assistant = await VMPFCAssistant.createInstance();
      const response = await assistant.analyze('What are the risks of investing in stocks?');
      expect(response).to.be.a('string');
      expect(response).to.match(/risks/i);
    });
  });

  describe('OFCAssistant', function() {
    it('should evaluate rewards and positive outcomes', async function() {
      const assistant = await OFCAssistant.createInstance();
      const response = await assistant.analyze('What are the benefits of a healthy diet?');
      expect(response).to.be.a('string');
      expect(response).to.match(/benefits/i);
    });
  });

  describe('MPFCAssistant', function() {
    it('should provide insights into social intentions and relationships', async function() {
      const assistant = await MPFCAssistant.createInstance();
      const response = await assistant.analyze('How can I build better relationships at work?');
      expect(response).to.be.a('string');
      expect(response).to.match(/relationships/i);
    });
  });

  describe('ACCAssistant', function() {
    it('should provide performance monitoring and conflict resolution strategies', async function() {
      const assistant = await ACCAssistant.createInstance();
      const response = await assistant.analyze('How do I resolve conflicts at work?');
      expect(response).to.be.a('string');
      expect(response).to.match(/conflicts/i);
    });

    it('should synthesize responses from all agents', async function() {
      const assistants = await createAssistants();
      const inputText = 'How do I manage my time, assess risks, understand rewards, resolve conflicts, and improve relationships?';
      const response = await assistants.ACC.analyze(inputText);
      console.log('Actual Response:', response); // Log the actual response
      expect(response).to.be.a('string');
      expect(response).to.match(/managing time/i); // Adjust to match key concept
      expect(response).to.match(/assessing risks/i);
      expect(response).to.match(/understanding rewards/i);
      expect(response).to.match(/resolving conflicts/i);
      expect(response).to.match(/improving relationships/i);
    });
  });
});
