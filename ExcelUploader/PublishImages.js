var contentful = require('contentful-management')

var client = contentful.createClient({
  accessToken: 'CFPAT-I64BgFiznHaozenhCw8jaIVVXj_r9K96ADaouiqf3fM'
})

console.log("\nStart publishing Bilder.....");
client.getSpace('kfibk3xh1vwb')
  .then((space) => space.getEnvironment('master')
    .then((environment) => {
      environment.getAssets()
        .then((assets) => {
          assets.items.forEach((item, index) => {
            if (!item.isPublished() || item.isUpdated()) {
              setTimeout(function () {
                item.publish().then((asset) => console.log("Published: " + asset.fields.title.de));
              }, 200 * index);
            }
          })
        }).catch(console.error())
    })
  );
