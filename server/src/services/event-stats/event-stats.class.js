/* eslint-disable no-unused-vars */
const timebucket = require('timebucket')
const moment = require('moment')
moment.locale('de')
const timeStep = 'm'

class Service {
  constructor (app) {
    this.app = app
  }

  async get (eventId) {
    const entries = (await this.app.service('entry').find({
      paginate: false,
      query: {
        eventId,
        $sort: {createdAt: -1}
      }
    }))
    const entriesIn = entries.filter(entry => entry.count >= 0)
    const entriesOut = entries.filter(entry => entry.count < 0)

    const dataIn = entriesIn
      .reduce((bucketMap, entry) => {
        const bucket = timebucket(timeStep, new Date(entry.createdAt)).toDate()
        if (!bucketMap[bucket]) bucketMap[bucket] = 0
        bucketMap[bucket] += entry.count
        return bucketMap
      }, {})
    const dataOut = entriesOut
      .reduce((bucketMap, entry) => {
        const bucket = timebucket(timeStep, new Date(entry.createdAt)).toDate()
        if (!bucketMap[bucket]) bucketMap[bucket] = 0
        bucketMap[bucket] -= entry.count
        return bucketMap
      }, {})

    const dataTotal = entries
      .reduce((bucketMap, entry) => {
        const bucket = timebucket(timeStep, new Date(entry.createdAt)).toDate()
        if (!bucketMap[bucket]) bucketMap[bucket] = 0
        bucketMap[bucket] += entry.count
        return bucketMap
      }, {})

    const [dataAcc] = Object.keys(dataTotal)
      .sort((a, b) => (a > b ? 1 : -1))
      .reduce(([bucketMap, acc], bucket) => {
        acc += dataTotal[bucket]
        bucketMap[bucket] = acc
        return [bucketMap, acc]
      }, [{}, 0])

    return [
      {
        name: 'Eingang',
        data: dataIn
      },
      {
        name: 'Ausgang',
        data: dataOut
      },
      {
        name: 'Total',
        data: dataAcc
      }
    ]
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
