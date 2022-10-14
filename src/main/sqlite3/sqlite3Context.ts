import { ipcRenderer } from 'electron';
import { foodData } from '../../renderer/app/redux/foodSlice';

const sqlite3Context = {
  // I've done this to fix an issue with the react component not waiting for the data to be returned.
  getAllFood(channel: string) {
    return ipcRenderer.invoke(channel);
  },
  addFood(obj: foodData): void {
    ipcRenderer.send('addFood', obj);
  },
  deleteFood(id: string): void {
    ipcRenderer.send('deleteFood', id);
  },
};

export type Sqlite3ContextApi = typeof sqlite3Context;

export default sqlite3Context;