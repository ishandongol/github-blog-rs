import { useFormContext } from "react-hook-form";
import { useHookController } from "./essentials";
import { Input, InputError, InputTitle } from "../base/input";

interface HookInputProps {
    title: string;
    name: string;
    required?: boolean;
}
export const HookInput = (props: HookInputProps) => {
    const { title, name, required } = props
    const { control } = useFormContext()
    const { field, fieldState: { error } } = useHookController({ name, control, rules: { required } })
    return (
        <label className="relative block">
            <InputTitle title={title} />
            <Input {...field} />
            {error && <InputError message={error?.message || error?.type} />}
        </label>
    )
}

