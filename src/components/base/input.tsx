import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">>((props, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 mt-2  px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
    )
})

export const InputTitle = ({ title, required }: { title: string, required?: boolean }) => {
    return (
        <>
            <span className="font-thin">{title} </span> {!required && <span className="text-xs text-primary-500 text-extrathin">(Optional)</span>}
        </>
    )
}

export const InputError = ({ message }: { message?: string }) => {
    return (
        <span className="text-red-500 text-xs">{message}</span>
    )
}