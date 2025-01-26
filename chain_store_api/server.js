const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/komeda_stores', (req, res) => {
  fs.readFile('stores.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    try {
      const stores = JSON.parse(data);
      res.json(stores);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('Error parsing JSON');
    }
  });
});

app.get('/stores/:id', (req, res) => {
  const storeId = parseInt(req.params.id);
  fs.readFile('stores.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    try {
      const stores = JSON.parse(data);
      const store = stores.find(store => store.id === storeId);
      if (store) {
        res.json(store);
      } else {
        res.status(404).send('店舗が見つかりませんでした');
      }
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('Error parsing JSON');
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});