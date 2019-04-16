const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.all("/header/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-3-17-179-159.us-east-2.compute.amazonaws.com/"
  });
});

app.all("/hotels/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-188-161-215.us-east-2.compute.amazonaws.com/"
  });
});

// app.all("/prices/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-18-222-174-176.us-east-2.compute.amazonaws.com/"
//   });
// });

app.all("/location/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-54-215-233-5.us-west-1.compute.amazonaws.com/"
  });
});

app.all("/api/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-222-0-232.us-east-2.compute.amazonaws.com/"
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
