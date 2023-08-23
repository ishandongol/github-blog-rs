import { forwardRef } from "react";
import ReactSelect from 'react-select'
export interface SelectProps {
    isMulti?: boolean
    options: { [id: string]: any }[]
}

export const Select = forwardRef<any, SelectProps>((props, ref) => {
    return (
        <ReactSelect ref={ref} className="mt-2" {...props} />
    )
})
