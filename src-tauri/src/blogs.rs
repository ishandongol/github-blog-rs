use directories::UserDirs;
use serde::{Deserialize, Serialize};
use std::fs::OpenOptions;
use std::io::*;
use std::time::SystemTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct Metadata {
    image: Option<Image>,
    author: Option<Author>,
    slug: String,
    title: String,
    categories: Vec<Category>,
    excerpt: String,
    #[serde(rename = "publishedAt")]
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

#[derive(Debug, Serialize, Deserialize)]
pub enum BlogStatus {
    Success(String),
    Failed(String),
}
#[tauri::command]
pub fn create_blog(mut blog: Blog) -> (BlogStatus, Option<String>) {
    if let Some(user_dirs) = UserDirs::new() {
        let file_name = format!(
            "{}{}{}.md",
            user_dirs.document_dir().unwrap().to_str().unwrap(),
            std::path::MAIN_SEPARATOR,
            blog.metadata.slug
        );
        let current_time = SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64;
        println!("{:?}", current_time);
        blog.metadata.published_at = current_time;
        println!("{:?}", blog);
        let yaml = serde_yaml::to_string(&blog.metadata).unwrap();
        let mut file = match OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open(file_name.clone())
        {
            Ok(file) => file,
            Err(err) => {
                return (
                    BlogStatus::Failed(format!("Failed to open: {}", err.to_string())),
                    None,
                )
            }
        };
        let all_content = [b"---\n", yaml.as_bytes(), b"---\n", blog.content.as_bytes()].concat();
        match file.write_all(&all_content) {
            Ok(_) => "Saved".to_string(),
            Err(e) => {
                return (
                    BlogStatus::Failed(format!("Failed to write: {}", e.to_string())),
                    None,
                )
            }
        };
        return (
            BlogStatus::Success(format!("Created: {}", file_name)),
            Some(String::from_utf8(all_content).unwrap()),
        );
    }
    (
        BlogStatus::Failed(format!("Failed to get Documents Directory.")),
        None,
    )
}
