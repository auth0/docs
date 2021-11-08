const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../../config/redirects.js'), 'utf8');

const BLOCK_COMMENT_REGEX = /\/\*([^\/\*]+)\*\//g;

content = content.replace(BLOCK_COMMENT_REGEX, (match, group) => `// ${group}`);

fs.writeFileSync(path.join(__dirname, '../../config/redirects.js'), content);
