#!/usr/bin/env node

var fontify = require('../index.js');
var fs = require('fs');
var path = require('path');
var isThere = require('is-there');
var appRoot = require('app-root-dir').get();

var dataFile = path.join(appRoot, 'fontify.json');

if (!isThere(dataFile)) {
  console.error('Configuration file not found: fontify.json');
  return;
}

var data = require(dataFile);

fontify.dest = data.dest || '.';

if (!isThere(path.join(appRoot, fontify.dest))) {
  console.error('Destination folder not found: ' + fontify.dest);
  return;
}

data.modules.forEach(function(module) {
  fontify.copy(module, function(err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Finished copying " + module);
  });
});
