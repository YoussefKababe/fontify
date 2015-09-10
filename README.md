Fontify
=======

Fontify is a simple tool that grabs all the fonts from the node_modules folder and places them wherever you want. This can be very helpful for developers who use [NPM](https://www.npmjs.com) to manage their front-end dependencies.

###Usage:

Install Fontify:

```bash
$ npm i fontify -g
```

Then place a file called "fontify.json" on the root folder of your project, you will use this file to specify the names of packages you want to copy font files from (source), plus the name of the folder where you want to place them (destination):

```json
{
  "modules": [
    "bootstrap",
    "font-awesome"
  ],
  "dest": "dist"
}
```

Now when you type "**fontify**" in your terminal, Fontify will look for all the font files of the specified packages, and place them in a folder called "fonts" inside the destination folder.

###Programmatic usage:

Install Fontify:

```bash
$ npm i fontify --save
```

After that you can require it in your code and use it like this:

```javascript
var fontify = require('fontify');

fontify.dest = "dist";

fontify.copy('font-awesome', function(err) {
  if (err)
    console.error(err);
});
```
