import { contextBridge } from 'electron';
import sqlite3Context from './sqlite3Context';

contextBridge.exposeInMainWorld('api', {
  sqlite3Context: sqlite3Context,
});