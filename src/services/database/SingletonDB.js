const sqlite3 = require('sqlite3');


class DatabaseSingleton {
  constructor(dbPath) {
    if (!DatabaseSingleton.instance) {
      this.db = new sqlite3.Database(dbPath);
      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }
}

module.exports = DatabaseSingleton;