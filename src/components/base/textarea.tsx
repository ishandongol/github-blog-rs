import { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, React.InputHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
    const { className = "", ...rest } = props;
    return (
        <textarea
            {...rest}
            ref={ref}
            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 mt-2  px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ${className}`}
        />
    )
})
