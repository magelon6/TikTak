import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { PORT } from '@/globals'
import axios from 'axios'
import { Video } from 'types'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false);

  const router = useRouter();

  const onVideoClick = () => {
    if(isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if(post && videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [post, isMuted])

  const videoRef = useRef<HTMLVideoElement>(null)

  if(!post) return null

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={router.back}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              loop
              onClick={onVideoClick}
              autoPlay
              ref={videoRef}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            >
            </video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button 
                onClick={onVideoClick}
              >
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl"/>
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMuted ? (
            <button>
              <HiVolumeOff onClick={() => setIsMuted(false)} className="text-white  text-2xl lg:text-4xl"/>
            </button>
          ) : (
            <button>
              <HiVolumeUp onClick={() => setIsMuted(true)} className="text-white text-2xl lg:text-4xl"/>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params: { id }}: {params: { id: string }}) {

  const { data } = await axios.get(`${PORT}api/post/${id}`);

  return {
    props: { postDetails: data}
  }  
} 


export default Detail