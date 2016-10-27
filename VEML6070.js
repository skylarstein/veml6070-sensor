/*
  VEML6070.js

  I2C driver for the Vishay Semiconductors VEML6070 UVA Light Sensor
*/

'use strict';

class VEML6070 {

  constructor(options) {
    const i2c = require('i2c-bus');
    this.i2cBus = i2c.openSync((options && options.hasOwnProperty('i2cBusNo')) ? options.i2cBusNo : 1);

    this.VEML6070_ADDR_H = 0x39;
    this.VEML6070_ADDR_L = 0x38;
  }

  init(options) {
    return new Promise((resolve, reject) => {
      let integrationTime = (options && options.hasOwnProperty('integrationTime')) ? options.integrationTime : VEML6070.VEML6070_INTEGRATION_TIME_1_T();
      let cmd = (integrationTime & 0x03) << 2;
      this.i2cBus.i2cWrite(this.VEML6070_ADDR_L, 1, Buffer.from([cmd]), (err, bytesWritten, buffer) => {
        if(err) {
          return reject(err);
        }

        console.log(`VEML6070 initialized with ${VEML6070.IntegrationTimeStringify(integrationTime)}`);
        return resolve();
      });
    });
  }

  readSensorData() {
    return new Promise((resolve, reject) => {
      this.i2cBus.i2cRead(this.VEML6070_ADDR_H, 1, new Buffer(1), (err, bytesRead, bufferHigh) => {
        if(err) {
          return reject(err);
        }

        this.i2cBus.i2cRead(this.VEML6070_ADDR_L, 1, new Buffer(1), (err, bytesRead, bufferLow) => {
          if(err) {
            return reject(err);
          }

          resolve({uv : (bufferHigh[0] << 8) | bufferLow[0]});
        });
      });
    });
  }

  static VEML6070_INTEGRATION_TIME_HALF_T() {
    return 0x0;
  }

  static VEML6070_INTEGRATION_TIME_1_T() {
    return 0x1;
  }

  static VEML6070_INTEGRATION_TIME_2_T() {
    return 0x2;
  }

  static VEML6070_INTEGRATION_TIME_4_T() {
    return 0x3;
  }

  static IntegrationTimeStringify(t) {
    switch(t) {
      case VEML6070.VEML6070_INTEGRATION_TIME_HALF_T():
        return 'VEML6070_INTEGRATION_TIME_HALF_T';

      case VEML6070.VEML6070_INTEGRATION_TIME_1_T():
        return 'VEML6070_INTEGRATION_TIME_1_T';

      case VEML6070.VEML6070_INTEGRATION_TIME_2_T():
        return 'VEML6070_INTEGRATION_TIME_2_T';

      case VEML6070.VEML6070_INTEGRATION_TIME_4_T():
        return 'VEML6070_INTEGRATION_TIME_4_T';

      default:
        return 'UNKNOWN';
    }
  }

}

module.exports = VEML6070;
