import { Loader2 } from "lucide-react"

export const LoaderCustombg = ({size}: {size ?:number, className?:string}) => {
    return <Loader2 className="animate-spin" size={size} />
}