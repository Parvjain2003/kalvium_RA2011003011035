const express = require('express');
const app = express();

const port = 3001;

const calculation = require("./routes/calculate");
const history = require("./routes/history");

app.use("/history",history);
app.use("/",calculation);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

