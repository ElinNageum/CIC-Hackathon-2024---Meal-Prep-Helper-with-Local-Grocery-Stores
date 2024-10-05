require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const scraper = require('./src/scraper/scraper');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.options('*', cors()); 


const getData = async function(){
const data = scraper.getAllURLS("https://flipp.com/en-ca/vancouver-bc/flyer/6853525-no-frills-weekly-flyer-valid-thursday-october-3-wednesday-october-9?postal_code=V6T1A1");
const json =  JSON.stringify(data);
fs.writeFileSync("./data", json, 'utf-8');
}



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});


app.use((req, res) => {
  console.log("404")
  res.status(404);
  res.send('<h1>Error 404: Resource not found</h1>')
})