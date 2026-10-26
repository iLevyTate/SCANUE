import test from 'node:test';
import assert from 'node:assert/strict';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { MultiAgentQLearning } from '../qlearning.js';

test('dotenv loads quoted values without overwriting existing configuration', () => {
  const env = { PORT: '4000' };
  const result = dotenv.config({ processEnv: env, quiet: true, path: [], override: false });
  assert.equal(result.error, undefined);
  dotenv.populate(env, dotenv.parse('PORT=3000\nLABEL="hello world"\n'));
  assert.deepEqual(env, { PORT: '4000', LABEL: 'hello world' });
});

test('OpenAI chat completion preserves the request and response contract offline', async () => {
  let requests = 0;
  const client = new OpenAI({
    apiKey: 'offline-test-key',
    maxRetries: 0,
    fetch: async (url, init) => {
      requests++;
      assert.equal(String(url), 'https://api.openai.com/v1/chat/completions');
      assert.equal(init.method, 'POST');
      assert.equal(new Headers(init.headers).get('authorization'), 'Bearer offline-test-key');
      const body = JSON.parse(init.body);
      assert.equal(body.model, 'gpt-4o-mini-2024-07-18');
      assert.equal(body.messages[1].content, 'Plan my day');
      return new Response(JSON.stringify({
        id: 'offline', object: 'chat.completion', created: 0,
        model: body.model,
        choices: [{ index: 0, finish_reason: 'stop', message: { role: 'assistant', content: 'Prioritize tasks.' } }],
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    },
  });
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [{ role: 'system', content: 'Help plan.' }, { role: 'user', content: 'Plan my day' }],
    temperature: 0.7,
  });
  assert.equal(response.choices[0].message.content.trim(), 'Prioritize tasks.');
  assert.equal(requests, 1);
});

test('Q-learning inference returns a finite value for each action', async () => {
  const agent = new MultiAgentQLearning(3, 2, 0.05, 0.9, 0);
  try {
    const actions = await agent.act([0.1, 0.2, 0.3]);
    assert.equal(actions.length, 2);
    assert.ok(actions.every(Number.isFinite));
  } finally {
    agent.qNetworkOnline.model.dispose();
    agent.qNetworkTarget.model.dispose();
  }
});
