const fs = require('fs');

var articles;

fs.readFile('Artikles.json', 'utf8', function (err, data) {
    if (err) throw err;
    articles = JSON.parse(data);
    console.log(articles.articles[0]);
});