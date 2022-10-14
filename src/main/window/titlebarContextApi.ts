/* eslint-disable @typescript-eslint/no-explicit-any */
import { TitlebarContextApi } from './titlebarContext';

const context: TitlebarContextApi = (window as any).electron_window.titlebar;

export default context;
