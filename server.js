const http = require("http");
const app = require("./backend/app");
const debug = require("debug")("node-angular");
//http.post = require("http-post");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listening on" + bind);
};

const port = normalizePort(process.env.PORT || "3000");
//const port = process.env.PORT || 3000;

app.set("port", port);

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(port);

// app.post("/api/deleteUser", function (req, res) {
//   model.remove({ _id: req.body.id }, function (err) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send({ data: "Record has been Deleted..!!" });
//     }
//   });
// });

// app.get("/api/getUser", function (req, res) {
//   model.find({}, function (err, data) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

//module.exports = app;

// app.listen(4200, function() {
//     console.log('Example app listening on port 8080!')
// })
