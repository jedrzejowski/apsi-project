const express = require("express");

const PORT = 9900;
const app = express();

app.use(express.static("./dist/public/"));

app.listen(9900, () => {

});

