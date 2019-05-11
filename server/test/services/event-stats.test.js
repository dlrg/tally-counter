const assert = require('assert');
const app = require('../../src/app');

describe('\'event-stats\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-stats');

    assert.ok(service, 'Registered the service');
  });
});
