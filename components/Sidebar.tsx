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
                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Sidebar;