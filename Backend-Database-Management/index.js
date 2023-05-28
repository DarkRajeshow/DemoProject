const express = require("express");
const cors = require("cors");
const connectToMongo = require('./db');
const port = 5000;

connectToMongo();



const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/user', require('./routes/user'));

app.get("/", (req, res) => {
    res.send("Hello world");
})

const server = app.listen(port, () => {
    console.log('Server running on port ' + port);
});

server.timeout = 120000; 