import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { Video } from 'types'

import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
  post: Video;
  volume: number;
  setVolume: (volume: number) => void;
}

const VideoCard: NextPage<IProps> = ({ post, volume, setVolume }) => {

  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVolumeSliderChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  }

  const handleVolumeIconMouseOver = () => {
    setShowVolumeSlider(true);
  }

  const handleVolumeIconMouseOut = () => {
    setShowVolumeSlider(false);
  }

  const handleVideo = () => {
    if(playing){
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef.current.volume = volume
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if(videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <Image
                width={22}
                height={22}
                className="rounded-full"
                src={post.postedBy.image}
                alt="profile photo"
                layout="responsive"
              />
            </Link>
          </div>
          <div className="text-lg ">
            <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video
              className='lg:w-[400px] h-[150px] md:h-[400px] lg:h-[400px] w-[200px] rounded-2xl cursor-pointer bg-gray-100' 
              src={post.video.asset.url}
              loop
              ref={videoRef}
            >
            </video>
          </Link>
          { isHover && (
            <div className="absolute bottom-6 cursor-pointer left-11 md:left-20 md:justify-center lg:left-0 flex gap-10 lg:justify-center w-[100px] md:w-[50px] lg:w-[400px] p-3">
              {playing ? (
                <button onClick={handleVideo}>
                  <BsFillPauseFill className="text-[#f9804b] text-2xl lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={handleVideo}>
                  <BsFillPlayFill className="text-[#f9804b] text-2xl lg:text-4xl"/>
                </button>
              )}
              <div
                onMouseEnter={handleVolumeIconMouseOver}
              >
                {isMuted ? (
                  <button>
                    <HiVolumeOff onClick={() => setIsMuted(false)} className="text-[#f9804b] text-2xl lg:text-4xl"/>
                  </button>
                ) : (
                  <button>
                    <HiVolumeUp onClick={() => setIsMuted(true)} className="text-[#f9804b] text-2xl lg:text-4xl"/>
                  </button>
                )}
                {showVolumeSlider && (
                  <input 
                    className='absolute accent-[#f9804b] right-10 mr-2 cursor-pointer rotate-[-90deg] transition ease-in-out'
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onMouseLeave={handleVolumeIconMouseOut}
                    onChange={handleVolumeSliderChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
/// some additional comment
export default VideoCard