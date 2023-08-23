import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextEditor } from "./text-editor";
import { generateSlug } from "./libs/generate-slug";

interface Image {
  src: string;
  alt?: string;
  attribution?: string;
}

interface Author {
  image?: Image;
  slug?: string;
  name: string;
  bio?: string;
}

interface Category {
  slug: string;
  color?: string;
  title: string;
}

interface Metadata {
  image?: Image;
  author?: Author;
  slug: string;
  title: string;
  categories: Category[];
  excerpt: string;
  published_at: number;
}

interface Blog {
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

const defaultValues: Blog = {
  metadata: emptyMetadata,
  content: ""
};

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });
  const [response, setResponse] = useState("")
  const onSubmit = async (withoutSlug: unknown) => {
    const blog = { ...(withoutSlug as Blog) };
    blog.metadata.slug = generateSlug(blog.metadata.title)
    setResponse(await invoke("greet", { blog }))
  }
  return (
    <div className="w-full p-10 mx-auto h-[100vh] bg-secondary-50">
      {response}
      <h1 className="text-3xl font-semibold text-center text-primary-800">Github Blogs Creator</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full container mx-auto">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="grid grid-cols-2 gap-4">
          <label className="relative block">
            <span>Title</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20" />
            </span>
            <input {...register("metadata.title", { required: true })}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text" />
          </label>
          <div className="col-span-2">
            <TextEditor />
          </div>

        </div>
        <button type="submit" >Save</button>
      </form>
    </div>
  );
}

export default App;
