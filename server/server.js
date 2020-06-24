const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, '../public');

// Port
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(publicPath));

//  Greeting endpoint

// app.get('/', (req, res) => {
//   //   res.render('index');
//   //   res.send('hello jamiu');
// });

app.listen(port, console.log(`Server running on port: ${port}`));
