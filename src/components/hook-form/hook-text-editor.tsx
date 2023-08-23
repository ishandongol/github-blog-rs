import { useFormContext } from "react-hook-form";
import { useHookController } from "./essentials";
import { InputError, InputTitle } from "../base/input";
import { TextEditor } from "../base/text-editor";

interface HookInputProps {
    title: string;
    name: string;
    required?: boolean;
}

export const HookTextEditor = (props: HookInputProps) => {
    const { title, name, required } = props
    const { control, setValue } = useFormContext()
    const { field: { onChange, ...rest }, fieldState: { error } } = useHookController({ name, control, rules: { required } })
    return (
        <>
            <InputTitle title={title} required={required} />
            <TextEditor {...rest} onChange={(value) => {
                setValue(name, value)

            }} />
            {error && <InputError message={error?.message || error?.type} />}
        </>
    )
}

