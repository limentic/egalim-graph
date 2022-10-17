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
  // I could not get this to be typed correctly so I just used "any".
  // I am not sure if this is a bug in the electron typings or if I am doing something wrong.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onWindowState: (callback: any) => ipcRenderer.on('windowState', callback)
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext; 