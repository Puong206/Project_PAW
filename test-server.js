const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! If you see this, the connection works!');
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://192.168.152.116:${port}`);
});
