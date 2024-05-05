import Image from 'next/image';
import 'tailwindcss/tailwind.css';

export default function Loader1() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
            <div className="max-w-xs mx-auto">
                <Image
                    src="/assets/gif/loading_heart.gif"
                    alt="Description de l'image"
                    width={200}
                    height={200}
                    className="img-fluid"
                />
            </div>
        </div>
    );
}