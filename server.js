const express = require('express');
const port = 8100;
const app = express();
const nocache = require("nocache");

app.use(express.static(__dirname + '/dist/we-all-plan-web-ui'));
app.use(nocache());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/we-all-plan-web-ui/index.html'));
})
app.listen(process.env.PORT || port, () => {
  console.log("Server is listening on port " +port);
});
