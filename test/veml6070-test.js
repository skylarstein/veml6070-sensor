process.env.NODE_ENV = 'test';

const chai     = require('chai');
const VEML6070 = require('../VEML6070.js');
const expect   = chai.expect;

describe('veml6070-sensor', () => {
  it('it should communicate with the device', (done) => {
    const veml6070 = new VEML6070();
    expect(veml6070).to.be.an.instanceof(VEML6070);
    veml6070.init()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('it should receive valid sensor data', (done) => {
    const veml6070 = new VEML6070();
    expect(veml6070).to.be.an.instanceof(VEML6070);
    veml6070.init()
      .then(() => veml6070.readSensorData())
      .then((data) => {
        console.log(`VEML6070 sensor data: ${JSON.stringify(data)}`);
        expect(data).to.have.all.keys('uv');
        expect(data.uv).to.be.at.within(0, 250000);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
