"use client";
import Link from 'next/link';

export const Button_link_welcome = () =>
{
    return (
        <Link href="/welcome" className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
        Retour à la page welcome pour rencontrer de nouvelles personnes
        </Link>
    );
} 