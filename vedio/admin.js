const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join('./'), { index: "index.html" }));


// app.get('/', (req, res) => {
//     res.redirect('./public/test.html');
// });


app.listen(8083, () => {
    console.log('Server is running at http://localhost:8083')
})