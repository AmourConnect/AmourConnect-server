"use client";

import Image from 'next/image';
import 'tailwindcss/tailwind.css';

const Loader1 = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#fffbf7]">
            <div className="max-w-xs mx-auto">
                <Image
                    src="/assets/gif/loading_heart1.gif"
                    alt="Loading"
                    width={600}
                    height={600}
                    className="img-fluid"
                    priority={true}
                    quality={100}
                    unoptimized={true}
                />
            </div>
        </div>
    );
}

export default Loader1