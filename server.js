const express = require('express');
const port = 8080;
const app = express();
//const nocache = require("nocache");


app.use(express.static(__dirname + '/dist/we-all-plan-web-ui'))
//app.use(nocache())

app.get('*', (req, res) => {
  res.sendFile(__dirname + '//dist/we-all-plan-web-ui/index.html')
});
app.listen(process.env.PORT || port, () => {
  console.log("Server is listening on port "+port);
});
