import Cookie_Session from '../lib/Cookie_Session';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { handleSubmit } from '../lib/TreatmentForm';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button_1 from '../app/components/Button_1';

export default function Login() {

  const router = useRouter();

  const [responseData, setResponseData] = useState({
    message: '',
  });

    return (
      <div className="flex flex-col">
       <Head>
        <title>Connexion AmourConnect❤️</title>
        <link rel="icon" type="image/png" href="/assets/images/amour_connect_logo.jpg"/>
      </Head>


<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">AmourConnect❤️</h1>

    <p className="mt-4 text-grey-500">
      Connectez-vous vite pour rencontrer votre amour 😘😻!
    </p>
  </div>


  {responseData && responseData.message && (
                  <p style={{color:"red"}} >{responseData.message}</p>
  )}
  <form onSubmit={(e) => handleSubmit(e, setResponseData, router, '/api/login')} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
      <label htmlFor="email" className="sr-only">Email</label>

      <div className="relative">
        <input
          type="email"
          name='email'
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter email"
        />

        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            className="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </span>
      </div>
    </div>

    <div>
      <label htmlFor="password" className="sr-only">Password</label>

      <div className="relative">
        <input
          type="password"
          name='mot_de_passe'
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter password"
        />

        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            className="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        No account?
        <a className="underline" href="register">Sign up</a>
      </p>
      <Button_1 className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">Sign in</Button_1>
    </div>
  </form>
</div>



      </div>
    );
}


export async function getServerSideProps(context?: any) {

  const session = new Cookie_Session();
  const sessionResponse = await session.RedirectUserIfConnectInRouteSession(context);

  if ('redirect' in sessionResponse) {
      return sessionResponse;
  }

  
  return {
      props: {
      },
    };
}