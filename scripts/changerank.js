function updateDrivers(array, arrayUpdate) {
  arrayUpdate.forEach((driverInLap) => {
    const driver = array.find((d) => d.idCar === driverInLap.idCar);
    if (driver) {
      if (Number(driver.position) != Number(driverInLap.position)) {
        console.log(
          `Driver ${driver.pilot} changed position from ${driver.position} to ${driverInLap.position}`
        );
        driver.position = driverInLap.position;
      }

      driver.time += driverInLap.time;
      driver.pit += driverInLap.pit;
      driver.lap += 1;
    }
  });
}

updateDrivers(drivers, lapResults.lap1);
