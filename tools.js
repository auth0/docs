var program = require('commander');
var fs = require('fs');
var Imagemin = require('imagemin');
var imageminOptipng = require('imagemin-optipng');

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
  });


program.command('img')
  .action(function() {
    new Imagemin()
      .src('media/**/*.png')
      .dest('media')
      .use(imageminOptipng({optimizationLevel: 3}))
      .run((err, files) => {
        if (err) {
          console.error(err);
        }
        console.log('Minified ' + files.length + ' images.');
        //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
      });
  });




program.parse(process.argv);
