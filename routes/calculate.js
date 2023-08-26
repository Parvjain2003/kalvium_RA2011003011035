const express = require('express');
const router = express.Router();

router.get("/",(req,res) =>{
    const values = req.params.values + req.params[0];
  const parts = values.split('/');

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

  res.send(`question:"${expression}",answer:${total}`);
})

module.exports = router;