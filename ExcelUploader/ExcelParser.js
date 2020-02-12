const Excel = require('exceljs');
const fs = require('fs');

var workbook = new Excel.Workbook();
var articles = [];
var article = {};

console.log("Parsing Excel spreadsheet.....\n");
workbook.xlsx.readFile('Artikel.xlsx')
    .then(function () {
        let worksheet = workbook.getWorksheet('Artikel-VK-Preise');
        let firstRow = worksheet.getRow(1);
        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber == 1) {
                row.eachCell(function (cell, cellNumber) {
                    if (cell.value.substr(0, 9) !== "Allergen ") {
                        article[cell.value.replace(/[\süäöß().\-/]+/g, '')] = null;
                    }
                })
            } else {
                let articleCopy = JSON.parse(JSON.stringify(article));
                row.eachCell(function (cell, cellNumber) {
                    if (firstRow.getCell(cellNumber).value.substr(0, 9) !== "Allergen ") {
                        articleCopy[firstRow.getCell(cellNumber).value.replace(/[\süäöß().\-/]+/g, '')] = cell.value;
                    }
                })
                articles.push(articleCopy);
            }
        });

        let file = fs.createWriteStream('Artikel.json');
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
        console.log("Excel spreadsheet erfolgreich geparsed!\n");
    });