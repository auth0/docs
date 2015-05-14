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


  .command('mv <oldPath> <newPath>')
  .action(function (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
      if (err) { return console.error(err); }

      var oldUrl = oldPath.replace('articles', '').replace('.md', '');
      var newUrl = newPath.replace('articles', '').replace('.md', '');
      addRedirect(oldUrl, newUrl, function(err) {
        if (err) { return console.error(err); }

        console.log('File renamed');
      });
    });
  });




program.parse(process.argv);
