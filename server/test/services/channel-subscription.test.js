const assert = require('assert')
const app = require('../../src/app')

describe('\'channel-subscription\' service', () => {
  it('registered the service', () => {
    const service = app.service('channel-subscription')

    assert.ok(service, 'Registered the service')
  })
})
