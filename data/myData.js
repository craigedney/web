let fs = require('fs');
const FILE_NAME = "./file/data.json77";

let myData = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let myData = JSON.parse(data).find(d => d.id == id);
                resolve(myData);
            }
        });
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let myData = JSON.parse(data);
                // Perform Search
                if (searchObject) {
                    myData = myData.filter(
                        d => (searchObject.id ? d.id == searchObject.id : true) &&
                            (searchObject ? d.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
                    );
                }
                resolve(myData);
            }
        });
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let myData = JSON.parse(data);
                myData.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(myData), function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(myData);
                    }
                });
            }
        });
    },
    update: function (newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let myDatas = JSON.parse(data);
                let myData = myDatas.find(d => d.id == id);
                if (myData) {
                    Object.assign(myData, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(myDatas), function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let myData = JSON.parse(data);
                let index = myData.findIndex(d => d.id == id);
                if (index != -1) {
                    myData.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(myData), function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(index);
                        }
                    });
                }
            }
        });
    },
};

module.exports = myData;