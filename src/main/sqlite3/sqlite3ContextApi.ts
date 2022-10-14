/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sqlite3ContextApi } from './sqlite3Context';

const context: Sqlite3ContextApi = (window as any).api.sqlite3Context;

export default context;
