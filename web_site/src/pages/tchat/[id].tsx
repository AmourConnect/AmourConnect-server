import { AuthStatus, GetMessageDto } from "@/Hook/type";
import Loader1 from "../../app/components/Loading/Loader1";
import { UseAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { compareByProperty } from '../../utils/helper';
import { Button_1Loading } from '../../app/components/Button/Button_1';
import { LoaderCustombg } from '../../app/components/ui/LoaderCustombg';

export default function TchatID() {


    const { status, UserGetConnected, SendMessage, GetTchatID, userDto, messageDto } = UseAuth();
    const router = useRouter();
    const { id } = router.query;
    const idNumber = Number(id);
    const [messageContent, setMessageContent] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);


    useEffect(() => {
        UserGetConnected();
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, UserGetConnected, router]);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Authenticated) {
            const fetchData = () => {
                GetTchatID(idNumber);
                timer = setTimeout(fetchData, 3000);
            };
            fetchData();
        }

        return () => clearTimeout(timer);
    }, [status, GetTchatID, idNumber]);


    const handleSendMessage = () => {
        SendMessage(idNumber, messageContent);
        setMessageContent('');
    };

    const handleSendMessage2 = () => {
        setIsLoaderVisible(true);
        SendMessage(idNumber, messageContent);
        setMessageContent('');
        setTimeout(() => {
            setIsLoaderVisible(false);
          }, 2000);
    };

    if (status === AuthStatus.Authenticated) {
        return (
            <div className="bg-pink-200 flex flex-col items-center justify-center h-screen sm:p-6">
                <Head>
                    <title>AmourConnect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="w-full max-w-xl mx-auto">
                    <div className="h-[60vh] overflow-y-auto px-4"> {/* Chat container with scrollable feature */}
                        {Array.isArray(messageDto) && messageDto.length > 0 ? (
                            messageDto
                                .sort((a, b) => compareByProperty(a, b, 'date_of_request'))
                                .reverse()
                                .map((messagedto: GetMessageDto) => (
                                    <div
                                        key={messagedto.id_Message}
                                        className={`flex items-center p-2 ${messagedto.idUserIssuer === userDto?.id_User
                                            ? 'justify-end'
                                            : 'justify-start'
                                            }`}
                                    >
                                        <div
                                            className={`mx-2 max-w-[70%] p-2 rounded-lg ${messagedto.idUserIssuer === userDto?.id_User
                                                ? 'bg-pink-400 text-white'
                                                : 'bg-gray-200'
                                                }`}
                                        >
                                            <a
                                                href={`/profil-details/${messagedto.idUserIssuer === userDto?.id_User 
                                                    ? userDto?.id_User 
                                                    : messagedto.idUserIssuer }`}
                                            >
                                                <p>
                                                    <strong>
                                                        {messagedto.idUserIssuer === userDto?.id_User
                                                            ? userDto?.pseudo
                                                            : messagedto.userIssuerPseudo}
                                                    </strong>
                                                </p>
                                            </a>
                                            <p>{messagedto.message_content}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(messagedto.date_of_request).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="flex justify-center">
                                <p className="text-center text-black">Rien à afficher ici 🫠</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center p-2">
                    {isLoaderVisible && <LoaderCustombg />}
                        <input
                            type="text"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSendMessage2();
                                }
                              }}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
                            placeholder="ecrire un message"
                        />
                        <Button_1Loading
                            onClick={() => {
                                handleSendMessage();
                            }}                              
                            title="Envoyer"
                            className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                        />
                    </div>
                </div>
                <a
                    href={`/request`}
                    className="text-white bg-pink-400 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                    Voir mes matchs
                </a>
            </div>
        );
    }

    return (
        <Loader1 />
    );
}