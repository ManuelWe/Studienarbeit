const Excel = require('exceljs');
const fs = require('fs');

var workbook = new Excel.Workbook();
var articles = [];
var article = {};

workbook.xlsx.readFile('Artikel.xlsx')
    .then(function () {
        let worksheet = workbook.getWorksheet('Artikel-VK-Preise');
        let firstRow = worksheet.getRow(1);
        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber == 1) {
                row.eachCell(function (cell, cellNumber) {
                    if (cell.value.substr(0, 9) !== "Allergen ") {
                        article[cell.value] = null;
                    }
                })
            } else {
                let articleCopy = JSON.parse(JSON.stringify(article));
                row.eachCell(function (cell, cellNumber) {
                    if (firstRow.getCell(cellNumber).value.substr(0, 9) !== "Allergen ") {
                        articleCopy[firstRow.getCell(cellNumber).value] = cell.value;
                    }
                })
                articles.push(articleCopy);
            }
        });
        console.log(articles[0]);

        let file = fs.createWriteStream('Artikles.json');
        file.on('error', function (err) { console.log("File error: " + err) });
        file.write("{\"articles\": [\n");
        articles.forEach(function (article, index) {
            file.write(JSON.stringify(article));
            if (index < articles.length - 1) {
                file.write(",\n");
            }
        });
        file.write("]}");
        file.end();
    });