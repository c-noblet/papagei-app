import Sqlite from 'nativescript-sqlite';
// import { knownFolders } from 'tns-core-modules/file-system';
import { knownFolders, Folder } from '@nativescript/core/file-system';
import { toast } from '../utils';

export default class DatabaseModel {

  constructor() {
    this.db = null;
  }

  openDatabase() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!Sqlite.exists('papagei.db')) {
          this.db = await Sqlite('papagei.db');
          await this.createTable();
        } else {
          this.db = await Sqlite('papagei.db');
        }
        if (this.db.isOpen()) {
          resolve();
        } else {
          reject('Database is not open');
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  createTable() {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `CREATE TABLE IF NOT EXISTS playlist (
          id INTEGER PRIMARY KEY,
          video_id STRING(255) NOT NULL,
          title STRING(255) NOT NULL,
          category STRING(255) NOT NULL,
          picture STRING(255) NOT NULL)`;
        await this.db.execSQL(query);
        query = `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY,
          key STRING(255) NOT NULL,
          value STRING(255) NOT NULL)`;
        await this.db.execSQL(query);
        query = `INSERT INTO settings (key, value) VALUES ('api', '')`;
        await this.db.execSQL(query);
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  exportData() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM playlist;`;
        let data = [];
        const results = await this.db.all(query);
        results.forEach((row) => { // Row
          data.push({
            id: row[0],
            vid: row[1],
            title: row[2],
            category: row[3],
            picture: row[4]
          });
        });

        const downloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
          android.os.Environment.DIRECTORY_DOWNLOADS
        ).toString();
        const downloadsFolder = Folder.fromPath(downloadsPath);
        const file = downloadsFolder.getFile(`papagei-export-${Date.now()}.json`);

        file.writeText(JSON.stringify(data))
        .then(result => {
          console.log(result);
        }).catch(err => {
          console.log(err);
        });

        toast('Sons exportés dans : Downloads');
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  importData(data) {
    return new Promise((resolve, reject) => {
      try {
        data.forEach(async line => {
          await this.add(line);
        });
        toast('Fichier importé');
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);  
      }
    });
  }

  add(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO playlist (video_id, title, category, picture) VALUES ('${item.vid}', '${item.title}', '${item.category}', '${item.picture}')`;
        await this.db.execSQL(query);
        toast('Vidéo ajouté');
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM playlist;`;
        let data = [];
        const results = await this.db.all(query);
        results.forEach((row) => { // Row
          data.push({
            id: row[0],
            vid: row[1],
            title: row[2],
            category: row[3],
            picture: row[4]
          })
        });
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getSettings() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM settings;`;
        let data = {};
        const results = await this.db.all(query);
        results.forEach((row) => { // Row
          data[row[1]] = row[2];
        });
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  setSettings(key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `UPDATE settings SET value = '${value}' WHERE key = '${key}'`;
        await this.db.execSQL(query);
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM 'playlist' WHERE id = ${id}`;
        await this.db.execSQL(query);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteAll() {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `DROP TABLE playlist`;
        await this.db.execSQL(query);
        query = `DROP TABLE settings`;
        await this.db.execSQL(query);
        await Sqlite.deleteDatabase('papagei.db');
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  close() {
    try {
      this.db.close();
    } catch (error) {
      console.log(error);

      reject(error);
    }
  }
}
