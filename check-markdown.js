const filehound = require('filehound');
const markdownlint = require('markdownlint');

const mdFiles = filehound.create()
  .paths('./articles')
  .ext('md')
  .findSync()
  .filter(path => {
    // Remove includes (files starting with underscore) from list
    const fileName = path.split('/').slice(-1)[0];
    return !/^_.*$/.test(fileName);
  });

const options = {
  files: mdFiles,
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

const result = markdownlint.sync(options);

console.log(result.toString(true));
