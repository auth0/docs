/* eslint-disable  no-console */
const markdownlint = require('markdownlint');

const options = {
  files: process.argv.slice(2),
  config: {
    default: false,
    // resultVersion: 1,
    MD001: true,
    MD002: true,
    MD003: true,
    MD024: true,
    MD025: true
  }
};

console.log('🗒  Linted files:');
process.argv.slice(2).forEach(filePath => console.log(`    📁  ${filePath}`));

markdownlint(options, (err, result) => {
  if (err) {
    console.log('❌ Error running markdownlint');
    process.exit(1);
  }

  if (result.toString() === '') {
    process.exit(0);
  }

  console.log('\n❌  Errors:');
  result
    .toString(true)
    .split('\n')
    .forEach(error => console.log(`    ${error}`));
  process.exit(1);
});
