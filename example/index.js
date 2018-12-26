const {IncludeMe} = require('../dist/index.js');

const includeMeByName = new IncludeMe(__dirname + '/pagesbyname', 'name');
const includeMeByPath = new IncludeMe(__dirname + '/pagesbypath', 'path');

console.log('--------------------------');
console.log(includeMeByName.run());
console.log('--------------------------');

console.log('--------------------------');
console.log(includeMeByPath.run());
console.log('--------------------------');
