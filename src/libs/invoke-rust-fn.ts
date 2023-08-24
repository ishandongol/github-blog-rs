import { InvokeArgs, invoke } from "@tauri-apps/api/tauri";
import { ask } from '@tauri-apps/api/dialog';

export const invokeRustFunction = <R = unknown>(cmd: string, args?: InvokeArgs) => invoke<R>(cmd, args)

export const warningAsk = async (message: string, title?: string) => ask(message, { title: title, type: 'warning' });
export const infoAsk = async (message: string, title?: string) => ask(message, { title: title, type: 'info' });
