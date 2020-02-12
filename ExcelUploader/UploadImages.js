var fs = require("fs");
var contentful = require('contentful-management')

var client = contentful.createClient({
    accessToken: 'CFPAT-I64BgFiznHaozenhCw8jaIVVXj_r9K96ADaouiqf3fM'
})

console.log("Beginne Bilder upload. Das könnte etwas dauern...")
fs.readdir('./Bilder', (err, files) => {
    files.forEach(file => {
        fs.readFile('./Bilder/' + file, function (err, data) {
            if (err) throw err;

            client.getSpace('kfibk3xh1vwb')
                .then((space) => space.getEnvironment('master'))
                .then((environment) => {
                    environment.getAssets()
                        .then((response) => {
                            existingAssets = response.items;
                            let assetId = file.split(".")[0];
                            let assetIndex = existingAssets.findIndex(x => x.fields.title.de === assetId);
                            if (assetIndex === -1) {
                                console.log("Lade " + file + " hoch");
                                // Encode to base64
                                var encodedImage = Buffer.from(data, 'binary');

                                environment.createAssetFromFiles({
                                    fields: {
                                        title: {
                                            'de': assetId
                                        },
                                        file: {
                                            'de': {
                                                contentType: 'image/jpeg',
                                                fileName: file,
                                                file: encodedImage
                                            }
                                        }
                                    }
                                })
                                    .then((asset) => { asset.processForAllLocales() })
                            }
                        })
                })
                .catch(console.error)
        });
    });
});