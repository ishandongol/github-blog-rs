import { useFormContext } from "react-hook-form";
import { HookInputProps, useHookController } from "./essentials";
import { InputError, InputTitle } from "../base/input";
import { Select, SelectProps } from "../base/select";


export interface HookSelectProps extends HookInputProps {
    reactSelectProps: SelectProps
}
export const HookSelect = (props: HookSelectProps) => {
    const { title, name, required, reactSelectProps } = props
    const { control } = useFormContext()
    const { field, fieldState: { error } } = useHookController({ name, control, rules: { required } })
    return (
        <label className="relative block z-10">
            <InputTitle title={title} required={required} />
            <Select {...field} {...reactSelectProps} />
            {error && <InputError message={error?.message || error?.type} />}
        </label>
    )
}

