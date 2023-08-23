export interface Image {
    src: string;
    alt?: string;
    attribution?: string;
}

export interface Author {
    image?: Image;
    slug?: string;
    name: string;
    bio?: string;
}

export interface Category {
    slug: string;
    color?: string;
    title: string;
}

export interface Metadata {
    image?: Image;
    author?: Author;
    slug: string;
    title: string;
    categories: Category[];
    excerpt: string;
    published_at: number;
}

export interface Blog {
    metadata: Metadata;
    content: string;
}

const emptyImage: Image = {
    src: "",
    alt: undefined,
    attribution: undefined
};

const emptyAuthor: Author = {
    image: emptyImage,
    slug: undefined,
    name: "",
    bio: undefined
};

const emptyMetadata: Metadata = {
    image: emptyImage,
    author: emptyAuthor,
    slug: "",
    title: "",
    categories: [],
    excerpt: "",
    published_at: 0
};

export const defaultValues: Blog = {
    metadata: emptyMetadata,
    content: ""
};