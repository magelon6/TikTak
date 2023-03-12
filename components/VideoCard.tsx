import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Video } from 'types'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className='flex-col'>
      <div>
        <div className="flex align-middle items-center">
          <div className="w-12 m-2">
            <Link href='/'>
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={post.postedBy.image}
                alt="profile photo"
                layout="responsive"
              />
            </Link>
          </div>
          <div className="text-lg ">
            <Link href='/'>
              <p>{post.postedBy.userName} </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex relative">
        <div className="absolute inset-0">
          <Link href="/">
            <video className=" object-cover bg-gray-600" loop muted>
              <source src={post.video.asset.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoCard