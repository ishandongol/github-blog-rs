use serde::{Deserialize, Serialize};
use std::fs::{self, OpenOptions};
use std::io::prelude::*;

use crate::blogs::{Author, Category};
#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    categories: Vec<Category>,
    authors: Vec<Author>,
}

fn get_base_dir() -> String {
    let dir = tauri::api::path::local_data_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_owned();
    dir
}
#[tauri::command]
pub fn save_settings(settings: Settings) -> String {
    let base_dir = get_base_dir();
    let mut file = match OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(format!(
            "{}{}settings.json",
            base_dir,
            std::path::MAIN_SEPARATOR
        )) {
        Ok(file) => file,
        Err(err) => return format!("Failed to open: {}", err.to_string()),
    };
    return match file.write_all(
        serde_json::to_value(&settings)
            .unwrap()
            .to_string()
            .as_bytes(),
    ) {
        Ok(_) => "Saved".to_string(),
        Err(e) => format!("Failed to save: {}", e.to_string()),
    };
}

#[tauri::command]
pub fn get_settings() -> Settings {
    let base_dir = get_base_dir();
    let contents = match fs::read_to_string(format!(
        "{}{}settings.json",
        base_dir,
        std::path::MAIN_SEPARATOR
    )) {
        Ok(contents) => contents,
        Err(ere) => {
            println!("Error: {:?}", ere);
            return Settings {
                categories: vec![],
                authors: vec![],
            };
        }
    };
    let settings = match serde_json::from_str(&contents) {
        Ok(settings) => settings,
        Err(ere) => {
            println!("Error: {:?}", ere);
            return Settings {
                categories: vec![],
                authors: vec![],
            };
        }
    };
    println!("Save Settings");
    settings
}

#[tauri::command]
pub fn clear_settings() -> bool {
    match fs::remove_file(format!(
        "{}{}settings.json",
        get_base_dir(),
        std::path::MAIN_SEPARATOR
    )) {
        Ok(_) => true,
        Err(_) => false,
    }
}
