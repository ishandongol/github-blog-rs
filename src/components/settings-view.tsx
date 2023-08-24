import * as Dialog from '@radix-ui/react-dialog';
import { HookForm } from './hook-form/essentials';
import { HookFieldArray } from './hook-form/hook-field-array';
import { HookInput } from './hook-form/hook-input';
import { Settings } from '../libs';
import { generateSlug } from '../libs/generate-slug';
import { invokeRustFunction, warningAsk } from '../libs/invoke-rust-fn';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';


export const SettingsView = ({ getSettings, settings }: { getSettings: () => void, settings: Settings }) => {
    const [settingsStatus, setSettingsStatus] = useState("")
    const { setValue } = useFormContext()
    useEffect(() => {
        setValue('categories', settings.categories)
        setValue('authors', settings.authors)
    }, [settings])
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="flex flex-row-reverse">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </Dialog.Trigger>
            <Dialog.Overlay className=" bg-primary-700 opacity-20 absolute top-0 bottom-0 left-0 right-0 w-full h-[100vh] z-20" />
            <Dialog.Content className="top-0 left-0 z-50  w-full h-full absolute flex items-center justify-center">
                <div className='w-5/6 h-5/6 bg-white rounded-xl'>
                    <HookForm onSubmit={async (values) => {
                        const settings = { ...values as Settings }
                        settings.authors = settings.authors.map((author) => ({ ...author, slug: generateSlug(author.name) }))
                        settings.categories = settings.categories.map((categories) => ({ ...categories, slug: generateSlug(categories.title) }))
                        const status = await invokeRustFunction<string>("save_settings", { settings })
                        setSettingsStatus(status)
                        getSettings()
                    }}>
                        <div className='p-10 flex flex-col gap-4 h-full w-full'>
                            <div>
                                <Dialog.Title className='text-2xl font-light'>Settings</Dialog.Title>
                                <Dialog.Description className='mt-2 font-extralight flex gap-4 items-center justify-between'>
                                    Change App Settings {settingsStatus && `(${settingsStatus})`}
                                    <button
                                        type="button"
                                        className='flex items-center justify-center gap-2 text-xs mx-2 border-2 border-red-600 py-1 px-2 text-red-700 rounded-full hover:bg-red-700 hover:text-white'
                                        onClick={async () => {
                                            const confirm = await warningAsk("Are you sure you want to clear the settings?", "Clear Settings")
                                            if (confirm) {
                                                await invokeRustFunction("clear_settings", {})
                                                getSettings()
                                            }
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Clear Settings</button>
                                </Dialog.Description>
                            </div>
                            <div className="grid grid-cols-2 gap-4 h-full flex-grow overflow-auto">
                                <div>
                                    <HookFieldArray required title={"Categories"} name='categories' renderField={({ name, index }) => {
                                        return (
                                            <div className='flex gap-2'>
                                                <div className='flex-grow'><HookInput name={`${name}.${index}.title`} title="Title" required /></div>
                                                <div className='flex-grow'> <HookInput name={`${name}.${index}.color`} title="Color" required /></div>
                                            </div>
                                        )
                                    }}
                                        defaultValues={{ title: "", color: "" }}
                                    />
                                </div>
                                <div>
                                    <HookFieldArray required title={"Authors"} name='authors' renderField={({ name, index }) => {
                                        return (
                                            <div className='flex gap-2'>
                                                <div className='flex-grow'><HookInput name={`${name}.${index}.name`} title="Name" required /></div>
                                                <div className='flex-grow'><HookInput name={`${name}.${index}.bio`} title="Bio" required /></div>
                                            </div>
                                        )
                                    }}
                                        defaultValues={{ name: "", bio: "" }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row-reverse gap-4 w-full flex-shrink-0 mb-6 ">
                                <button type="submit" className="rounded-full bg-primary-700 py-2 px-4 w-64 text-white hover:bg-primary-900" >Save</button>
                                <Dialog.Close asChild>
                                    <button type="button" className="rounded-full bg-gray-700 py-2 px-4 w-64 text-white hover:bg-gray-900" >Close</button>
                                </Dialog.Close>

                            </div>
                        </div>
                    </HookForm>
                </div>

            </Dialog.Content>
        </Dialog.Root>
    )
}