import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../utils/tiktak.png";

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

import { createOrGetUser } from 'utils';

const Navbar = () => {

    const user = false;

    return (
        <div className='w-full flex justify-between items-center
            border-b-2 border-gray-200 py-2 px-4'
        >
            <Link href='/'>
                <div className='w-[100px] md:w-[130px]'>
                    <Image
                        className="cursor-pointer"
                        src={Logo}
                        alt='TikTak'
                        layout='responsive'
                    />
                </div>
            </Link>

            <div>SEARCH</div>

            <div>
                { user ? (
                    <div>Logged in</div> 
                ) : (
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            createOrGetUser(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                )}
            </div>

        </div>
    );
};

export default Navbar;