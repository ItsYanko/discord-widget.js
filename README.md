# About
discord-widget.js is Promise-Based wrapper for Discord's widget API with minimal dependencies.

# Installation
[NPM](https://www.npmjs.com/package/discord-widget.js)
```sh
npm i discord-widget.js
```

# Basic Usage
```js
const w = require("discord-widget.js");
(async() => {
  try{
    let myWidget = await new w.Widget("GUILD_ID");
    console.log(myWidget.name);
  }catch(e){
    console.error(e.message);
  }
})();
```
**NOTE:** All _async_ class constructors (`new Something()`) should have a `try{}catch(e){}` block around them, as if any error occurs, it will be thrown

# Documentation
The JSDoc documentation can be found [here](https://pkg.discord-widget.ml/) (still a work in progress)
