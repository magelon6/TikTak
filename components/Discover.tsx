import React from 'react';

import { topics } from '../utils/constants'
import Link from "next/link";
import {useRouter} from "next/router";
import {className} from "postcss-selector-parser";

const Discover = () => {

    const router = useRouter()
    const { topic } = router.query

    const activeTopicStyle = `xl:border-2 xl:border-[#f9804b] text-[#f9804b]
        flex items-center justify-center gap-2 px-3 py-2 hover:bg-primary
        cursor-pointer rounded xl:rounded-full transition
    `
    const topicStyle = `xl:border-2 xl:border-gray-300 text-black
        flex items-center justify-center gap-2 px-3 py-2 hover:bg-primary
        cursor-pointer rounded xl:rounded-full transition 
    `

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular topics
            </p>
            <div className='flex gap-3 flex-wrap'>
                {topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                        <div className={ topic === item.name ? activeTopicStyle : topicStyle }>
                            <span className='font-bold text-2xl
                                xl:text-md'>
                                {item.icon}
                            </span>
                            <span className='hidden xl:block'>
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Discover;