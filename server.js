const express = require('express');
const app = express();
app.use(express.static('./crickatweb'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'src/crickatweb/'}),
);
app.listen(process.env.PORT || 8080);