import { FieldValues, FormProvider, UseControllerProps, UseControllerReturn, UseFormProps, useController, useForm, useFormContext } from "react-hook-form";



export interface HookInputProps {
    title: string;
    name: string;
    required?: boolean;
    className?: string;
}

interface HookFormProviderProps extends UseFormProps<FieldValues, any> {
    children: React.ReactNode
}
export const HookFormProvider = ({ children, ...rest }: HookFormProviderProps) => {
    const methods = useForm(rest)

    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )

}

interface HookFormProps {
    children: React.ReactNode
    onSubmit: (values: FieldValues) => Promise<void>
    className?: string
}

export const HookForm = (props: HookFormProps) => {
    const { children, onSubmit, className = "w-full h-full container mx-auto mt-8" } = props
    const { handleSubmit } = useFormContext()
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            {children}
        </form>
    )
}

export const useHookController = (props: UseControllerProps<FieldValues, string>): UseControllerReturn<FieldValues, string> => {
    return useController({ ...props });

}