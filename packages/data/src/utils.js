const fs = require("fs");

const saveJSON = (fileName, jsonName) => {
  const jsonString = JSON.stringify(jsonName);
  fs.writeFileSync(fileName, jsonString, "utf-8");
};

const sleep = (milliseconds) => {
  const start = new Date().getTime();
  let elapsed = 0;
  while (elapsed < milliseconds) {
    elapsed = new Date().getTime() - start;
  }
};

module.exports = { saveJSON, sleep };
