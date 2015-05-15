var program = require('commander');
var fs = require('fs');

var redirectFilePath = './redirect-urls.json';
 var addRedirect = function(oldUrl, newUrl, callback) {
   fs.readFile(redirectFilePath, function(err, json) {
     if (err) { return callback(err); }

     var data = JSON.parse(json);
     data.push({
       from: oldUrl,
       to: newUrl
     });

     json = JSON.stringify(data, null, 2);
     fs.writeFile(redirectFilePath, json, callback);
   });
 };


program
  .version('0.0.1')


  .command('mv <oldUrl> <newUrl>')
  .action(function (oldUrl, newUrl) {
    if (oldUrl[0] !== '/') {
      oldUrl = '/' + oldUrl;
    }
    if (newUrl[0] !== '/') {
      newUrl = '/' + newUrl;
    }
    var oldPath = 'articles' + oldUrl + '.md';
    var newPath = 'articles' + newUrl + '.md';
    fs.rename(oldPath, newPath, function(err) {
      if (err) { return console.error(err); }

      addRedirect(oldUrl, newUrl, function(err) {
        if (err) { return console.error(err); }

        console.log('File renamed');
      });
    });
  });




program.parse(process.argv);
