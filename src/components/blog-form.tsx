import { useState } from "react";
import { generateSlug } from "../libs/generate-slug";
import { Blog, Settings, defaultValues } from "../libs";
import { HookInput } from "./hook-form/hook-input";
import { HookForm } from "./hook-form/essentials";
import { HookTextEditor } from "./hook-form/hook-text-editor";
import { useFormContext } from "react-hook-form";
import { HookSelect } from "./hook-form/hook-select";
import { invokeRustFunction, warningAsk } from "../libs/invoke-rust-fn";


interface BlogCreationResponse {
    Success?: string,
    Failed?: string
}
export const BlogForm = ({ settings: { authors, categories } }: { settings: Settings }) => {
    const [response, setResponse] = useState<[BlogCreationResponse, string]>()
    const { reset, formState: { isDirty } } = useFormContext()
    const [editorKey, setEditorKey] = useState(true)
    const resetForm = () => {
        reset(defaultValues)
        setEditorKey(false)
        setResponse(undefined)
    }
    const onSubmit = async (withoutSlug: unknown) => {
        const blog = { ...(withoutSlug as Blog) };
        blog.metadata.slug = generateSlug(blog.metadata.title)
        setResponse(await invokeRustFunction<[BlogCreationResponse, string]>("create_blog", { blog }))
    }
    return (
        <>
            {response && <div className="my-4 mx-auto ">
                {response[0].Success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative" role="alert">{response[0].Success}</div>}
                {response[0].Failed && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">{response[0].Failed}</div>}
            </div>}
            <h1 className="text-3xl font-semibold text-center text-primary-800">Github Blogs Creator</h1>
            <HookForm onSubmit={onSubmit} >
                <div className="grid grid-cols-2 gap-4">
                    <HookInput name="metadata.title" title="Title" required />
                    <HookInput name="metadata.excerpt" title="Excerpt" required />
                    <HookSelect name="metadata.author" title="Author" required reactSelectProps={{
                        options: authors,
                        getOptionLabel: (option) => option.name,
                        getOptionValue: (option) => option.slug,
                    }} />
                    <HookSelect name="metadata.categories" title="Categories" required reactSelectProps={{
                        options: categories,
                        isMulti: true,
                        getOptionLabel: (option) => option.title,
                        getOptionValue: (option) => option.slug,
                    }} />
                    <div className="col-span-2">
                        <HookTextEditor name="content" title="Content" required key={`${editorKey}`} />
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4 w-1/2 float-right mt-4">
                    <button type="button" onClick={async () => {
                        if (isDirty) {
                            const confirmed = await warningAsk("Are you sure you want to reset the form?", "Clear Current Blog")
                            if (confirmed) {
                                resetForm()
                            }
                        }
                    }} className="rounded-full bg-gray-700 py-2 px-4 w-full text-white hover:bg-gray-900" >Clear</button>
                    <button type="submit" className="rounded-full bg-primary-700 py-2 px-4 w-full text-white hover:bg-primary-900" >Create .md</button>
                </div>
            </HookForm>
        </>
    );
}

