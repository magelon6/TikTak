import React, {useState} from 'react';
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from 'next/link'

import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from "react-icons/im";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const userProfile = false;

    const normalLink = `flex items-center gap-3 hover:bg-primary p-3 
                        justify-center xl:justify-start cursor-pointer 
                        font-semibold text-[#f9804b] rounded`

    const toggleSideBar = () => {
        return setShowSidebar(prevState => !prevState)
    }

    return (
        <div>
            <div className='block xl:hidden m-2 ml-4 mt-3
                 text-xl cursor-pointer'
                 onClick={toggleSideBar}
            >
                { showSidebar ? <ImCancelCircle /> : <AiOutlineMenu /> }
            </div>
            {showSidebar && (
                <div className='xl:w-400 w-20 flex flex-col
                    justify-start mb-10 border-r-2 border-gray-100
                    xl:border-0 p-3'
                >
                    <Link href='/' className='xl:border-b-2 xl:border-gray-200 pb-6'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block '>
                                For you
                            </span>
                        </div>
                    </Link>
                    {!userProfile && (
                        <div className='px-2 py-4 hidden xl:block '>
                            <p className='text-gray-400'>Log in to like and comment videos</p>
                            <div className='pr-4'>
                                <button
                                    className='cursor-pointer bg-white text-lg text-[#f9804b]
                                        border-[1px] border-[#f9804b] font-semibold
                                        px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white
                                        hover:bg-[#f9804b] transition '
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    )}
                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Sidebar;