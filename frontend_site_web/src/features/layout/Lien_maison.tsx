"use client"
import { Home } from "lucide-react"
import Link from 'next/link'

export const Lien_maison = () => {
    return (
        <div className="py-2 flex justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-lg m-auto border-t border-accent">
            <Link href='/'>
                <Home size={30} />
            </Link>
        </div>
    )
}