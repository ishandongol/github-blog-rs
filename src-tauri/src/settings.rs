use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    categories: Vec<Category>,
    authors: Vec<Author>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    title: String,
    color: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Author {
    name: String,
    bio: String,
}

#[tauri::command]
pub fn save_settings(settings: Settings) -> bool {
    true
}

#[tauri::command]
pub fn get_settings() -> Settings {
    Settings {
        categories: vec![],
        authors: vec![],
    }
}
