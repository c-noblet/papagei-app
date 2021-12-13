import {
  enablePromise,
  openDatabase
} from 'react-native-sqlite-storage';

export default class DatabaseModel {

  constructor() {
    this.connection = null;
  }

  openDatabase() {
    return new Promise(async (resolve, reject) => {
      enablePromise(true);
      this.connection = await openDatabase({
        name: 'playlist.db',
        location: 'default'
      });
      await this.createTable();
      resolve(this.connection);
    });
  }

  createTable() {
    return new Promise(async (resolve) => {
      const query = `CREATE TABLE IF NOT EXISTS playlist (
        id INTEGER PRIMARY KEY,
        video_id STRING(255) NOT NULL,
        title STRING(255) NOT NULL,
        picture STRING(255) NOT NULL)`;
      await this.connection.executeSql(query);
      console.log('create db');
      resolve();
    });
  }

  add(item) {
    return new Promise(async (resolve) => {
      const query = `INSERT INTO playlist (video_id, title, picture) VALUES ('${item.id}', '${item.title}', '${item.picture}')`;
      await this.connection.executeSql(query);
      console.log('add');
      resolve();
    })
  }

  getAll() {
    return new Promise(async (resolve) => {
      const query = `SELECT * FROM playlist;`;
      let data = [];
      const results = await this.connection.executeSql(query);
      results.forEach((result) => {
        for (let i = 0; i < result.rows.length; i++) {
          data.push(result.rows.item(i));
        }
      });
      console.log('get all');
      resolve(data);
    });
  }

  deleteAll() {
    return new Promise(async (resolve) => {
      const query = `DROP TABLE playlist`;
      await this.connection.executeSql(query);
      console.log('delete all');
      resolve();
    });
  }

  close() {
    this.connection.close();
  }
}
