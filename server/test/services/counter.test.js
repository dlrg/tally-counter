const assert = require('assert')
const app = require('../../src/app')

describe('\'counter\' service', () => {
  it('registered the service', () => {
    const service = app.service('counter')

    assert.ok(service, 'Registered the service')
  })
})
