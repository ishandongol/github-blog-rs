import { FieldValues, UseFieldArrayAppend, UseFieldArrayReturn, useFieldArray, useFormContext } from "react-hook-form";
import { HookInputProps } from "./essentials";
import { InputTitle } from "../base/input";


export interface RenderFieldProps {
    name: string;
    index: number;
    item: Record<"id", string>
}
interface HookFieldArrayProps extends HookInputProps {
    renderField: (props: RenderFieldProps) => React.ReactNode
    defaultValues: { [id: string]: any }
}
export const HookFieldArray = (props: HookFieldArrayProps) => {
    const { title, name, required, renderField, defaultValues } = props
    const { control } = useFormContext()
    const { fields, remove, append } = useFieldArray({ name, control, rules: { required } })
    return (
        <>
            <InputTitle title={title} required={required} />
            {fields.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start justify-start w-full  pt-8 px-10 my-4 pb-10 bg-secondary-50 border rounded-xl">
                    <div className="flex-grow">{renderField({ item, index, name })}</div>
                    <button type="button" onClick={() => remove(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
            ))}
            <div className="flex items-center justify-center mb-10">
                <button type='button' onClick={() => {
                    append(defaultValues)
                }} className="flex gap-1 rounded-full py-2 px-4 text-primary-600 border border-primary-600 hover:bg-primary-900 hover:text-white" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add
                </button>

            </div>
        </>
    )
}

