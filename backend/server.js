require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const scraper = require('./src/scraper/scraper');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.options('*', cors()); 


scraper.scrapeAndParse("https://flipp.com/en-ca/vancouver-bc/item/880109139-nesters-market-weekly-ad?postal_code=V6T1A1");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});


app.use((req, res) => {
  console.log("404")
  res.status(404);
  res.send('<h1>Error 404: Resource not found</h1>')
})