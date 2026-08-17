const os = require('os');

console.log(os.platform());
console.log(os.arch());

const cpus = os.cpus();
console.log('CPU: ' + cpus.length);
console.log('Model: ' + cpus[0].model);