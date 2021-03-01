# About
discord-widget.js is Promise-Based wrapper for Discord's widget API with minimal dependencies.

# Installation
```sh
npm i discord-widget.js
```

# Usage
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
# Coming Soon!
In future versions a more detailed documentation will come. For the time being, this package has JSDoc comments. If your IDE has IntelliSense, it will help a lot
