import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { generateSlug } from "../libs/generate-slug";
import { Blog, defaultValues } from "../libs";
import { HookInput } from "./hook-form/hook-input";
import { HookForm } from "./hook-form/essentials";
import { HookTextEditor } from "./hook-form/hook-text-editor";
import { useFormContext } from "react-hook-form";



export const BlogForm = () => {
    const [response, setResponse] = useState("")
    const { reset } = useFormContext()
    const [editorKey, setEditorKey] = useState(true)
    const resetForm = () => {
        reset(defaultValues)
        setEditorKey(false)
    }
    const onSubmit = async (withoutSlug: unknown) => {
        const blog = { ...(withoutSlug as Blog) };
        blog.metadata.slug = generateSlug(blog.metadata.title)
        setResponse(await invoke("greet", { blog }))
    }
    return (
        <>
            {response}
            <h1 className="text-3xl font-semibold text-center text-primary-800">Github Blogs Creator</h1>
            <HookForm onSubmit={onSubmit} >
                <div className="grid grid-cols-2 gap-4">
                    <HookInput name="metadata.title" title="Title" required />
                    <HookInput name="metadata.excerpt" title="Excerpt" required />
                    <div className="col-span-2">
                        <HookTextEditor name="content" title="Content" required key={`${editorKey}`} />
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4 w-1/2 float-right mt-4">
                    <button type="button" onClick={resetForm} className="rounded-full bg-gray-700 py-2 px-4 w-full text-white hover:bg-gray-900" >Cancel</button>
                    <button type="submit" className="rounded-full bg-primary-700 py-2 px-4 w-full text-white hover:bg-primary-900" >Save</button>
                </div>
            </HookForm>
        </>
    );
}

