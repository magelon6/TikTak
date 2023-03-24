import React, { useEffect } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from 'state/authStore';

import { IUser } from '../types'

const SuggestedAccounts = () => {
    const { fetchAllUsers, allUsers } = useAuthStore();

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]); 

    return (
        <div className="xl:border-b-2 border-gray-300 pb-4">
            <p className="m-3 mt-4 hidden xl:block text-gray-500 font-semibold">
                Suggested Accounts
            </p>
            <div>
                {allUsers.slice(0, 6).map((user: IUser) => (
                    <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold roundned">
                            <Image 
                                src={user.image}
                                width={34}
                                height={34}
                                className="rounded-full"
                                alt="user profile image"
                            />
                        </div>
                        <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                {user.userName}
                                <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                                {user.userName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuggestedAccounts;