const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get("/", (req, res) => {
  let content = `
  <body>
    <h2> Welcome </h2>
    <p>Send Mathematical Operation in URL</p>
    
    <p>Methods to write Expression:</p>
    <ul>
        <li>plus: + 
        <p>Example: <a href="http://localhost:3001/5/plus/2">http://localhost:3001/5/plus/2</a></p>
        </li>
        <li>minus: -
        <p>Example: <a href="http://localhost:3001/5/minus/2">http://localhost:3001/5/minus/2</a></p>
        </li>
        <li>into: *
        <p>Example: <a href="http://localhost:3001/5/into/2">http://localhost:3001/5/into/2</a></p>
        </li>
        <li>by: /
        <p>Example: <a href="http://localhost:3001/5/by/2">http://localhost:3001/5/by/2</a></p>
        </li>
    </ul>
    <br>
    <p>Check History: <a href="/history">History</a></p>
  </body>
  `;
  res.send(content);
});


router.get("/:values*",(req,res) =>{
    let values = req.params.values + req.params[0];
    let parts = values.split('/');

    let total = parseFloat(parts[0]); 
    let op ='' ;
    let expression = '';

    if (parts.length < 3 || parts.length % 2 == 0) {
      return res.status(400).send('Invalid operation format.');
    }

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part === "plus" || part === "minus" || part === "into" || part === "by") {
        op = part; 
      } else {
        const num = parseFloat(part);
        
        if (isNaN(num)) {
            res.status(400).send("Invalid numbers or operators in URL");
        return;
        }

        if (op) {
          switch (op) {

            case "plus":
              total += num;
              expression += "+"+num;
              break;

            case "minus":
              total -= num;
              expression += "-"+num;
              break;
          
            case "into":
              total *= num;
              expression += "*"+num;
              break;
         
            case "by":
              if (num === 0) {
                res.status(400).send("Cannot divide by zero");
                return;
              }
              total /= num;
              expression += "/"+num;
              break;
          }
        } 
      else{
        expression+=num;
      }
    }
  }

  let response = { question: expression , answer: total};

  let historyData = JSON.parse(fs.readFileSync('history.json', 'utf-8'));

  if (historyData.length >= 20) {
    historyData.shift(); 
  }
  
  historyData.push(response);

  fs.writeFileSync('history.json', JSON.stringify(historyData, null, 2));
  res.send(response);
})

module.exports = router;