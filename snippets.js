var fs = require('fs');
var path = require('path');


var folders = [
  'client-platforms',
  'native-platforms',
  'server-apis',
  'server-platforms'
];

var snippets = [
  'dependancies.md',
  'setup.md',
  'use.md'
];

for (var i = 0; i < folders.length; i++) {
  var platformFolderPath = path.join(__dirname, 'snippets', folders[i]);
  if (!fs.existsSync(platformFolderPath)) {
    fs.mkdirSync(platformFolderPath);
  }
  var articles = fs.readdirSync(path.join(__dirname, 'articles', folders[i]));
  for (var n = 0; n < articles.length; n++) {
    var article = articles[n];
    var snippetFolderPath = path.join(platformFolderPath, article.replace('.md', ''));
    if (!fs.existsSync(snippetFolderPath)) {
      fs.mkdirSync(snippetFolderPath);
      for (var s = 0; s < snippets.length; s++) {
        fs.writeFileSync(path.join(snippetFolderPath, snippets[s]), '', 'utf8');
      }
    }
  }
}
