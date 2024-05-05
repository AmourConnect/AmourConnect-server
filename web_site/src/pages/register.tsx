import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthStatus, UserRegister } from "@/Hook/type";
import { useAuth } from "@/Hook/UseAuth";
import Loader1 from "../app/components/Loader1";
export default function Register() {

    const { status, authenticate, FinalRegister, error } = useAuth();
    const router = useRouter();

    const [pseudo, setPseudo] = useState('');
    const [sex, setSex] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        authenticate();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Authenticated) {
            timer = setTimeout(() => {
                router.push('/welcome');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, authenticate, router]);


    if (status === AuthStatus.Unauthenticated)
    {

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const user: UserRegister = {
                pseudo: pseudo,
                sex: sex,
                city: city,
                dateOfBirth: dateOfBirth
            };
            FinalRegister(user.pseudo, user.sex, user.city, user.dateOfBirth);
        };

        return (
            <>
            { error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="sex">Sex</label>
                    <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="Marseille">Marseille</option>
                        <option value="Paris">Paris</option>
                        <option value="Lyon">Lyon</option>
                        <option value="Strasbourg">Strasbourg</option>
                        <option value="Toulouse">Toulouse</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birthday</label>
                    <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                </form>
            </>
        );
    }

    return (
            <Loader1 />
    );
}