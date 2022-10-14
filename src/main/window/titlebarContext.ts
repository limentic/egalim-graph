import { ipcRenderer } from 'electron';

const titlebarContext = {
  minimize () {
    ipcRenderer.send('minimizeApp');
    console.log('test')
  },
  maximizeRestore () {
    ipcRenderer.send('maximizeRestoreApp');
  },
  close () {
    ipcRenderer.send('closeApp');
  },
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext;