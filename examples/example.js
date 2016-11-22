const VEML6070 = require('veml6070-sensor');

// VEML6070 constructor options object is optional, i2cBusNo defaults to 1
//
const veml6070 = new VEML6070({ i2cBusNo : 1 });

const readSensorData = () => {
  veml6070.readSensorData()
    .then((data) => {
      console.log(`data = ${JSON.stringify(data, null, 2)}`);
      setTimeout(readSensorData, 1000);
    })
    .catch((err) => {
      console.log(`VEML6070 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
};

// VEML6070 init options object is optional, integrationTime defaults to VEML6070.INTEGRATION_TIME_1_T()
//
veml6070.init({ integrationTime : VEML6070.INTEGRATION_TIME_1_T() })
  .then(() => readSensorData())
  .catch((err) => console.error(`VEML6070 init failed: ${err} `));
