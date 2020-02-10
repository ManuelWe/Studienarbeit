var fs = require("fs");
var contentful = require('contentful-management')

var client = contentful.createClient({
    accessToken: 'CFPAT-I64BgFiznHaozenhCw8jaIVVXj_r9K96ADaouiqf3fM'
})

fs.readdir('./Bilder', (err, files) => {
    files.forEach(file => {
        fs.readFile('./Bilder/' + file, function (err, data) {
            if (err) throw err;

            // Encode to base64
            var encodedImage = Buffer.from(data, 'binary');
            var assetId = file.split(".")[0];

            client.getSpace('kfibk3xh1vwb')
                .then((space) => space.getEnvironment('master'))
                .then((environment) => environment.createAssetFromFiles({
                    fields: {
                        title: {
                            'de': assetId
                        },
                        file: {
                            'de': {
                                contentType: 'image/jpeg',
                                fileName: 'filename_english.jpg',
                                file: encodedImage
                            }
                        }
                    }
                }))
                .then((asset) => { console.log(asset); asset.processForAllLocales() })
                .then((asset) => { console.log(asset) })
                .catch(console.error)
        });
    });
});