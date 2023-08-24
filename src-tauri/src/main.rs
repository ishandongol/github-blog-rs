// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod blogs;
mod settings;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            blogs::create_blog,
            settings::save_settings,
            settings::get_settings,
            settings::clear_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
