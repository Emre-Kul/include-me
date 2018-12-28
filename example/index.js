const {IncludeMe} = require('../dist/index.js');

const includeMeByName = new IncludeMe(__dirname + '/pagesbyname', 'name');
const includeMeByPath = new IncludeMe(__dirname + '/pagesbypath', 'path');

console.log('--------------------------');
console.log(includeMeByName.load().asArray());
console.log('--------------------------');

console.log('--------------------------');
console.log(includeMeByName.load().asObject());
console.log('--------------------------');

console.log('--------------------------');
console.log(includeMeByPath.load().asArray());
console.log('--------------------------');

console.log('--------------------------');
console.log(includeMeByPath.load().asObject());
console.log('--------------------------');
