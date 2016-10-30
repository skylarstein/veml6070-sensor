# veml6070-sensor [![Node.js versions](https://img.shields.io/badge/Node.js-4.x%20through%207.x-brightgreen.svg)](https://nodejs.org) [![NPM version](https://img.shields.io/npm/v/veml6070-sensor.svg)](https://www.npmjs.com/package/veml6070-sensor)

Welcome to veml6070-sensor, a Node.js I2C module for the Vishay Semiconductors VEML6070 UVA Light Sensor. Adafruit has a [VEML6070 breakout board](https://www.adafruit.com/products/2899), and [here is the datasheet](http://www.vishay.com/docs/84277/veml6070.pdf).

This module uses [i2c-bus](https://github.com/fivdi/i2c-bus) which should provide access with Node.js on Linux boards like the Raspberry Pi Zero, 1, 2, or 3, BeagleBone, BeagleBone Black, or Intel Edison.

Since veml6070-sensor needs to talk directly to the I2C bus and requires access to /dev/i2c, you will typically need run Node with elevated privileges or add your user account to the i2c group: ```$ sudo adduser $USER i2c```

## Example Code

```
const VEML6070 = require('veml6070-sensor');

// VEML6070 constructor options object is optional, i2cBusNo defaults to 1
//
const veml6070 = new VEML6070( {i2cBusNo : 1} );

const readSensorData = () => {
  veml6070.readSensorData()
    .then((data) => {
      console.log(`data = ${JSON.stringify(data, null, 2)}`);
      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`VEML6070 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
}

// VEML6070 init options object is optional, integrationTime defaults to VEML6070.VEML6070_INTEGRATION_TIME_1_T()
//
veml6070.init({integrationTime : VEML6070.VEML6070_INTEGRATION_TIME_1_T()})
  .then((result) => readSensorData())
  .catch((err) => console.error(`VEML6070 init failed: ${err} `));
```

##Example Output

```
> sudo node example.js          
VEML6070 initialized with VEML6070_INTEGRATION_TIME_1_T
data = {
  "uv": 3839
}
```
##Example Wiring

For an example of I2C setup on a Raspberry Pi, take a look at my [pi-weather-station project](https://github.com/skylarstein/pi-weather-station).
