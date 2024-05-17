import { Loader2 } from "lucide-react"
import clsx from "clsx";

export const LoaderCustombg = ({size, className}: {size ?:number, className?:string}) => {
    return (
        <div className="flex justify-center items-center">
            <Loader2 
            className={clsx("animate-spin", className)}size={size} 
            />
        </div>
    );
}