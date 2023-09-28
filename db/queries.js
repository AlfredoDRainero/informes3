const db = require('./db');

function insertData(data) {
  return new Promise((resolve, reject) => {
    db.insert(data, (err, insertedData) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertedData);
      }
    });
  });
}

function getAllData() {
    return new Promise((resolve, reject) => {
      db.find({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  module.exports = {
    insertData,
    getAllData
  };