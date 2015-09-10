var findit = require('findit');
var path = require('path');
var stream = require('stream');
var fs = require('fs');
var isThere = require('is-there');
var appRoot = require('app-root-dir').get();

module.exports = {
  dest: '.',
  copy: function(moduleName, callback) {
    var _this = this;
    var modulePath = path.join(appRoot, 'node_modules', moduleName);

    if (!isThere(modulePath)) {
      callback("Module not found: " + moduleName);
      return;
    }

    if (!isThere(path.join(appRoot, this.dest))) {
      callback('Destination folder not found: ' + this.dest);
      return;
    }

    var finder = findit(modulePath);

    if (!isThere(path.join(appRoot, this.dest, 'fonts')))
      fs.mkdirSync(path.join(appRoot, this.dest, 'fonts'), '0776');

    finder.on('file', function(file, stat) {
      if (path.basename(path.dirname(file)) === 'fonts') copyFile(file);
    });

    finder.on('end', function() {
      callback(null);
      return;
    });

    function copyFile(file) {
      fs.createReadStream(file).pipe(fs.createWriteStream(path.join(appRoot, _this.dest, 'fonts', path.basename(file))));
    }
  }
};
