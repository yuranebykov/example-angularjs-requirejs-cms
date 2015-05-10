var connect = require('connect'),
    fs = require('fs'),
    serveStatic = require('serve-static');

var server = function(config) {
    config = config || {};

    var app = connect();

    if(config.livereload) app.use(require('connect-livereload')());

    app.use( serveStatic(__dirname));

    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }

        app.use('/', function(req, res) {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });

        app.listen(8080);
    });
};

if(module.parent) module.exports = server;
else server();