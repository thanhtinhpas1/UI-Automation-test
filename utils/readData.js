const fs = require('fs');
const csv = require('fast-csv');

module.exports = {
    readFileChrome: () => {
        return new Promise((resolve, reject) => {
            var data = []
            fs.createReadStream('./datatest/createUserChrome.csv')
                .pipe(csv.parse({ headers: false, encoding: 'utf-8' }))
                .on('error', error => {
                    console.log(new Error(error))
                    reject(error);
                })
                .on('data', row => {
                    var user = row[0].split(';');
                    var entity = {};
                    entity.username = user[0];
                    entity.realname = user[1];
                    entity.email = user[2];
                    data.push(entity);
                })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`)
                    resolve(data);
                    fs.close(2);
                });
        })
    },
    readFileFirefox: () => {
        return new Promise((resolve, reject) => {
            var data = []
            fs.createReadStream('./datatest/createUserFirefox.csv')
                .pipe(csv.parse({ headers: false, encoding: 'utf-8' }))
                .on('error', error => {
                    console.log(new Error(error))
                    reject(error);
                })
                .on('data', row => {
                    var user = row[0].split(';');
                    var entity = {};
                    entity.username = user[0];
                    entity.realname = user[1];
                    entity.email = user[2];
                    data.push(entity);
                })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`)
                    resolve(data);
                    fs.close(2);
                });
        })
    }
}