const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');

const app = require('../app');

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET /health exposes a stable liveness contract', async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: 'ok', service: 'crud-api-challenge' });
});

test('unknown routes return a controlled response', async () => {
  const response = await fetch(`${baseUrl}/not-found`);
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.deepEqual(body, { message: 'Route not found' });
});
