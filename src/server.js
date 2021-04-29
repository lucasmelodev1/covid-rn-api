const express = require("./app");

const port = process.env.PORT || 5000;

express.listen(port, () => {console.log(`listening on port ${port}!`)});