// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Metadata {
    image: Option<Image>,
    author: Option<Author>,
    slug: String,
    title: String,
    categories: Vec<Category>,
    excerpt: String,
    published_at: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Image {
    src: String,
    alt: Option<String>,
    attribution: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Author {
    image: Option<Image>,
    slug: Option<String>,
    name: String,
    bio: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    slug: String,
    color: Option<String>,
    title: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Blog {
    metadata: Metadata,
    content: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(blog: Blog) -> String {
    println!("The Blog Object{:?}", blog);
    format!("The slug of the blog is: {}", blog.metadata.slug)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
