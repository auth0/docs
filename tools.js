require('dotenv').load();
var program = require('commander');
var fs = require('fs');
var lsr = require('lsr');
var tinify = require('tinify');
var path = require('path');

tinify.key = process.env.TINYPNG_KEY;
var mediaPath = path.join(__dirname, '/media');

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
  .version('0.0.1');


program.command('mv <oldUrl> <newUrl>')
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
  })


program.command('img')
  .action(function() {
    lsr
    .sync(mediaPath)
    .forEach(function(fileStat) {
      var filepath = fileStat.path;
      console.log('compressing ' + filepath);
      // Skip non PNG files
      if (!/\.png$/.test(filepath)) return;

      var fullPath = path.join(mediaPath, filepath);
      var source = tinify.fromFile(fullPath);
      source.toFile(fullPath);
    });

  });




program.parse(process.argv);
