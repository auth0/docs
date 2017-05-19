const markdownlint = require('markdownlint');

const options = {
  files: process.argv.slice(2),
  config: {
    default: false,
    resultVersion: 1,
    'header-increment': true,
    'first-header-h1': true,
    'header-style': true,
    'no-reversed-links': true,
    'no-missing-space-atx': true,
    'no-multiple-space-atx': true,
    'no-duplicate-header': true,
    'single-h1': true,
    'no-trailing-punctuation': true,
    'no-multiple-space-blockquote': true,
    'no-bare-urls': true,
    'no-space-in-emphasis': true,
    'no-space-in-code': true,
    'no-space-in-links': true,
    'no-empty-links': true
  }
};

const result = markdownlint
  .sync(options)
  .toString(true);

console.warn(result);
process.exit(1);
