const express = require('express');
const os = require('os');
const bodyParser = require("body-parser");
const server = require("./server");
const cors = require("cors")
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'));

const path = require('path');
app.post("/api/getRandom", (req, res) => {
    server.getRandom(req, res);
});
app.get("/", (req, res) => {
    res.send('Heldo')
});
app.post("/api/updScore", (req, res) => {
    server.updScore(req, res);
});

app.post("/api/getTop", (req, res) => {
    server.getTop(req, res);
});



app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
