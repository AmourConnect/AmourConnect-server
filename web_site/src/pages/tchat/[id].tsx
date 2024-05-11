import { AuthStatus, GetMessageDto } from "@/Hook/type";
import Loader1 from "../../app/components/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';



export default function TchatID() {


    const { status, UserGetConnected, SendMessage, GetTchatID, userDto, messageDto } = UseAuth();
    const router = useRouter();
    const { id } = router.query;
    const idNumber = Number(id);
    const [messageContent, setMessageContent] = useState('');



    useEffect(() => {
        GetTchatID(idNumber);
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
                    {Array.isArray(messageDto) && messageDto.length > 0 ? (
                        messageDto.map((messagedto: GetMessageDto) => (
                            <div key={messagedto.id_Message} className={`flex items-center p-2 ${messagedto.idUserIssuer === userDto?.id_User ? 'justify-end' : 'justify-start'}`}>
                                <div className={`mx-2 p-2 rounded-lg ${messagedto.idUserIssuer === userDto?.id_User ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                    <p>{messagedto.message_content}</p>
                                    <p className="text-xs text-gray-500">{messagedto.date_of_request.toLocaleString()}</p>
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