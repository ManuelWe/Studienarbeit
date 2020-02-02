var contentful = require('contentful-management')

var client = contentful.createClient({
    accessToken: 'CFPAT-I64BgFiznHaozenhCw8jaIVVXj_r9K96ADaouiqf3fM'
})

console.log("\nStart publishing.....");
client.getSpace('kfibk3xh1vwb')
    .then((space) => space.getEnvironment('master')
        .then((environment) => {
            environment.getEntries({ 'content_type': 'produkt' })
                .then((entry) => {
                    entry.items.forEach((item, index) => {
                        setTimeout(function () {
                            item.publish().then((entry) => console.log("Published: " + entry.fields.Artikelbezeichnung.de));
                        }, 200 * index);
                    })
                }).catch(console.error())
        })
    );
