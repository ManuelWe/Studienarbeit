const fs = require('fs');
var contentful = require('contentful-management')

var articles;
var existingArticles = [];
var client = contentful.createClient({
    accessToken: 'CFPAT-I64BgFiznHaozenhCw8jaIVVXj_r9K96ADaouiqf3fM'
})

console.log("Starting upload....\n");
client.getSpace('kfibk3xh1vwb')
    .then((space) => space.getEnvironment('master')
        .then((environment) => {
            environment.getEntries({ 'content_type': 'produkt' })
                .then((response) => {
                    existingArticles = response.items;
                    fs.readFile('Artikel.json', 'utf8', function (err, data) {
                        if (err) throw err;
                        let articlesObject = JSON.parse(data);
                        articles = articlesObject.articles;
                        articles.forEach((article, index) => {
                            let articleIndex = existingArticles.findIndex(x => x.fields.ArtNr.de === article.ArtNr);
                            if (articleIndex !== -1) {
                                for (let [key, value] of Object.entries(article)) {
                                    if (article[key] !== "") {
                                        existingArticles[articleIndex].fields[key].de = article[key];
                                    } else {
                                        existingArticles[articleIndex].fields[key].de = "";
                                    }
                                }
                                article = existingArticles[articleIndex].fields;
                                setTimeout(function () {
                                    environment.getEntry(existingArticles[articleIndex].sys.id)
                                        .then((entry) => {
                                            entry.fields = article;
                                            return entry.update()
                                        })
                                        .then((entry) => console.log("Updated: " + entry.fields.Artikelbezeichnung.de))
                                        .catch(console.error)
                                }, 200 * index);
                            } else {
                                for (let [key, value] of Object.entries(article)) {
                                    article[key] = { "de": article[key] };
                                }
                                setTimeout(function (i) {
                                    environment.createEntry('produkt', {
                                        "fields": article
                                    }).then((entry) => console.log("Uploaded: " + entry.fields.Artikelbezeichnung.de))
                                        .catch(console.error)
                                }, 200 * index);
                            }
                        });
                    });
                }).catch(console.error);
        }));