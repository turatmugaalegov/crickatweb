const express = require('express');
const app = express();
app.use(express.static('./dist/src'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/src'}),
);
app.listen(process.env.PORT || 8080);