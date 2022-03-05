const http = require("http");
var url = require("url");
const axios = require("axios");

const hostname = "localhost";
const port = 4000;

const server = http.createServer((req, res) => {
    var query = url.parse(req.url, true).query;

    if (!query.q) {
        console.log("no query");
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end();
        return;
    }

    
    axios.get(`https://api.first.org/data/v1/countries?q=${query.q}`).then((response) => {
        console.log(response.data);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response.data));
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
