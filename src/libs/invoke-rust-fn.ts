import { InvokeArgs, invoke } from "@tauri-apps/api/tauri";

export const invokeRustFunction = <R = unknown>(cmd: string, args?: InvokeArgs) => invoke<R>(cmd, args)