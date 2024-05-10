const clc = require("cli-color");
const fs = require('fs');

let id;
var moduleName = "📦";
const tag = `${clc.white("[")}${clc.blue(moduleName)}${clc.white("]")}`;


const startLoading = (moduleName, data) => {

    if (id) {
        stopLoading(moduleName, clc.cyanBright(`Override Accepted.`));
    }

    id = setInterval(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`${tag} ${clc.bold(data)} `);
    }, 500);

    return id;
};

const stopLoading = (moduleName, data) => {
  clearInterval(id);
  id = null;
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  if (data) {
    process.stdout.write(`${tag} ${clc.redBright(data)}`);
  }
};

const log = (moduleName, data) => {
  const tag = `${clc.white("[")}${clc.blue(moduleName)}${clc.white("]")}`;
  console.log(`${tag} ${clc.white(data)}`);
};

const clear = () => {
  process.stdout.write(clc.erase.screen);
};

const post = () => {
  fs.readFile('./ascii.txt', 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the file:', error.message);
      return;
    }
    const lines = data.split(/\r?\n/); // Split by newline characters
    lines.forEach((line) => {
      console.log(line); // Process each line here
    });
  });
};

module.exports = {
  startLoading,
  stopLoading,
  log,
  clear,
  post
};