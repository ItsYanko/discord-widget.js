const { Widget } = require("./classes/classes");
(async () => {
    let a = await new Widget("793919117513850880");
    console.log(a.channels)
})();

(function wait() {
    if (true) setTimeout(wait, 1000);
})();