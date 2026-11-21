import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

test('conversation text is rendered without interpreting markup', () => {
  const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
  const start = html.indexOf('      function addConversationEntry(');
  const end = html.indexOf('conversationDiv.appendChild(entry);', start) + 'conversationDiv.appendChild(entry);'.length;
  const inputNode = {};
  const outputNode = {};
  let appended;
  const entry = {
    querySelector(selector) {
      return selector === '[data-conversation-input]' ? inputNode : outputNode;
    },
  };
  const context = {
    document: { createElement: () => entry },
    conversationDiv: { appendChild: (node) => { appended = node; } },
  };
  vm.runInNewContext(html.slice(start, end) + '\n}\naddConversationEntry("<img src=x onerror=alert(1)>", "<script>alert(1)</script>", false);', context);
  assert.equal(inputNode.textContent, '<img src=x onerror=alert(1)>');
  assert.equal(outputNode.textContent, '<script>alert(1)</script>');
  assert.equal(entry.innerHTML.includes('<img'), false);
  assert.equal(appended, entry);
});
