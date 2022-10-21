import { ipcMain } from 'electron';
import database from 'better-sqlite3';
import fs from 'fs';
import { foodData } from '../../renderer/app/redux/foodSlice';

function api() {
  const db = new database('database.db');

  if (fs.statSync('database.db').size === 0) {
    console.log('Creating database');
    db.exec(`
      CREATE TABLE IF NOT EXISTS food (
        id STRING (21, 21) PRIMARY KEY NOT NULL, 
        productName STRING (0, 255) NOT NULL, 
        date STRING (10, 10) NOT NULL, 
        weight REAL NOT NULL, 
        type INT NOT NULL
      );
    `);
  }

  ipcMain.handle('getAllFood', () => {
    const statement = db.prepare('SELECT * FROM food');
    const rows: foodData[] = statement.all();
    return rows;
  });

  // TODO : Paginated requests

  ipcMain.on('addFood', (event, obj) => {
    const insert = db.prepare(`
      INSERT INTO food 
        (id, productName, date, weight, type)
      VALUES 
        (@id, @productName, @date, @weight, @type);
    `);
    insert.run(obj);
  });

  ipcMain.on('deleteFood', (event, id) => {
    const del = db.prepare('DELETE FROM food WHERE id = ?');
    del.run(id);
  });
}

export default api;