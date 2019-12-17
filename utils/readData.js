const fs = require('fs');
const csv = require('fast-csv');

module.exports = {
    readListClass: () => {
        return new Promise((resolve, reject) => {
            var data = []
            fs.createReadStream('./datatest/classes.csv')
                .pipe(csv.parse({ headers: false, encoding: 'utf-8' }))
                .on('error', error => {
                    console.log(new Error(error))
                    reject(error);
                })
                .on('data', row => {
                    var user = row[0].split(';');
                    var entity = {};
                    entity.name = user[0];
                    entity.program = user[1];
                    data.push(entity);
                })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`)
                    resolve(data);
                    fs.close(2);
                });
        })
    },
    readListTeachers: () => {
        return new Promise((resolve, reject) => {
            var data = []
            fs.createReadStream('./datatest/teachers.csv')
                .pipe(csv.parse({ headers: false, encoding: 'utf-8' }))
                .on('error', error => {
                    console.log(new Error(error))
                    reject(error);
                })
                .on('data', row => {
                    var user = row[0].split(';');
                    var entity = {};
                    entity.email = user[0];
                    entity.firstName = user[1];
                    entity.lastName = user[2];
                    entity.phone = user[3];
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