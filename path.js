const path = require('path');

const filePath = path.join('data', 'profile.json');
console.log(filePath);

const configPath = path.resolve('data', 'profile.json');
console.log(configPath);
console.log(__dirname);

const fullPath = 'home/user/docs/report.json';
console.log(path.dirname(fullPath));
console.log(path.basename(fullPath));
console.log(path.extname(fullPath));