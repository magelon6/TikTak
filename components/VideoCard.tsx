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
    <div>
      <div>
        <div>
          <div>
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
        </div>
      </div>
    </div>
  )
}

export default VideoCard