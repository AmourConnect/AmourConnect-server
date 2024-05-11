import { AuthStatus } from "@/Hook/type";
import Loader1 from "../../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';



export default function TchatID() {


    const { status, UserGetConnected, SendMessage, GetTchatID, accountState } = UseAuth();
    const router = useRouter();
    const { id } = router.query;
    const idNumber = Number(id);
    const [messageContent, setMessageContent] = useState('');


        GetTchatID(idNumber);
    useEffect(() => {
        UserGetConnected();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, router]);


    const handleSendMessage = () => {
        SendMessage(idNumber, messageContent);
        setMessageContent('');
    };


    if (status === AuthStatus.Authenticated) {

        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/assets/images/amour_connect_logo.jpg" />
                </Head>
                <div className="w-full max-w-xl mx-auto">
                    {accountState.messageDto && accountState.messageDto.length > 0 ? (
                        accountState.messageDto.map((item, index) => (
                            <div key={index} className={`flex items-center p-2 ${item.idUserIssuer === accountState.userDto?.id_User ? 'justify-end' : 'justify-start'}`}>
                                <Image
                                    src={`data:image/jpeg;base64,${(item.idUserIssuer === accountState.userDto?.id_User ? item.userReceiverProfile_picture : item.userIssuerProfile_picture)}`}
                                    alt={item.idUserIssuer === accountState.userDto?.id_User ? item.userIssuerPseudo : item.userReceiverPseudo}
                                    className="w-8 h-8 rounded-full"
                                    width="50"
                                    height="50"
                                />
                                <div className={`mx-2 p-2 rounded-lg ${item.idUserIssuer === accountState.userDto?.id_User ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                    <p>{item.message_content}</p>
                                    <p className="text-xs text-gray-500">{item.date_of_request.toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun message</p>
                    )}
                    <div className="flex items-center p-2">
                        <input
                            type="text"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-300"
                            placeholder="ecrire un message"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 px-4 py-1 rounded-lg bg-blue-500 text-white"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Loader1 />
    );
}