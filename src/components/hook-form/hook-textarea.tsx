import { useFormContext } from "react-hook-form";
import { HookInputProps, useHookController } from "./essentials";
import { InputError, InputTitle } from "../base/input";
import { Textarea } from "../base/textarea";

export const HookTextarea = (props: HookInputProps) => {
    const { title, name, required } = props
    const { control } = useFormContext()
    const { field, fieldState: { error } } = useHookController({ name, control, rules: { required } })
    return (
        <label className="relative block">
            <InputTitle title={title} required={required} />
            <Textarea {...field} />
            {error && <InputError message={error?.message || error?.type} />}
        </label>
    )
}

