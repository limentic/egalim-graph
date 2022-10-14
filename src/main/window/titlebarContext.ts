import { ipcRenderer } from 'electron';

const titlebarContext = {
  minimize(): void {
    ipcRenderer.send('minimizeApp');
  },
  maximizeRestore(): void {
    ipcRenderer.send('maximizeRestoreApp');
  },
  close(): void {
    ipcRenderer.send('closeApp');
  },
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext;