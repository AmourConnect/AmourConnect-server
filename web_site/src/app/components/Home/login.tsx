import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import React, { useState, useEffect, FormEventHandler } from 'react';
import styles from '../../../../public/css/form.module.css';
import Button_1 from '../Button_1';
import { useAuth } from '@/Hook/UseAuth';

export default function Login() {

	const { login } = useAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
		login(
			data.get('email')!.toString(), data.get('mot_de_passe')!.toString()
		)
    }
  

  const [responseData, setResponseData] = useState({
    message: '',
  });

    return (
      <div className="flex flex-col" style={{ backgroundColor: 'pink' }}>
       <Head>
        <title>Login AmourConnect❤️</title>
        <link rel="icon" type="image/png" href="/assets/images/amour_connect_logo.jpg"/>
      </Head>



      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-black-200">Connectez-vous vite pour rencontrez votre amour😻❤️!</h1>
    {responseData && responseData.message && (
                  <p style={{color:"red"}} >{responseData.message}</p>
  )}
		<form onSubmit={handleSubmit}>
			<div className="mb-4">
				<label htmlFor="email" >Email Address</label>
				<input type="email" id="email" name='email' className={styles.customInput} placeholder="your@email.com" required/>
			</div>
			<div className="mb-4">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name='mot_de_passe' className={styles.customInput} placeholder="Enter your password" required/>
				<a href="ask_reset_password"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
				<a href="register"
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create your account</a>
				</div>
				<a href="valide_account"
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Valide your
					Account</a>
			</div>
      <Button_1 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</Button_1>

		</form>
	</div>
</div>



      </div>
    );
}