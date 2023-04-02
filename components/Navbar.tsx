import React, { FormEvent, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

import Logo from "../utils/tiktak.png";

import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi'

import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { createOrGetUser } from 'utils';
import useAuthStore from 'state/authStore';

const Navbar = () => {

    const { userProfile, addUser, removeUser } = useAuthStore();
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter();

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if(searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }

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

            <div className="relative hidden md:block">
                <form
                    onSubmit={handleSearch}
                    className="absolute md:static top-10 left-20 bg-white"
                >
                    <input
                     type="text"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     placeholder="Search accounts and video"
                     className="bg-primary p-3 md:text-md font-medium border-2 border-gray-300 focus-outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
                    />
                    <button
                        className="absolute md:right-5 right-6 top-3 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
                    >
                        <BiSearch />
                    </button>
                </form>
            </div>

            <div>
                { userProfile ? (
                    <div className="flex gap-5 md:gap-10">
                        <Link href='/upload'>
                            <button className="border-2 px-2 py-1.5 md:px-4 flex items-center text-md font-semibold gap-2">
                                <MdOutlineAdd className="text-2xl m-0" /><span className="hidden md:block">Upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href='/profile'>
                                <Image
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    src={userProfile.image}
                                    alt="your profile photo"
                                />
                            </Link>
                        )}
                        <button type='button' className='px-2' onClick={() => {
                            googleLogout(); removeUser();}} 
                        >
                            <AiOutlineLogout color='red' className="text-2xl "/>
                        </button>
                    </div> 
                ) : (
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            createOrGetUser(credentialResponse, addUser);
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