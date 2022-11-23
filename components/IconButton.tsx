import { ReactNode } from "react"

type Props = {
    className?:string,
    icon:ReactNode,
    onClick?:Function
}

export default function IconButton ({className,icon,onClick}:Props){
    return (
        <button onClick={()=>{onClick()}} className={`w-10.5 h-10.5 rounded-full bg-nb-2F63AE flex items-center justify-center hover:bg-white svg-2F63AE ${className}`}>{icon}</button>
    )
}