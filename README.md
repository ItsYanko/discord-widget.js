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
# Documentation
The JSDoc documentation can be found [here](https://itsyanko.github.io/discord-widget.js/) (still a work in progress)
