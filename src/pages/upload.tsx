import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client'; 

import useAuthStore from 'state/authStore';
import { client } from 'utils/client';

import { topics } from "utils/constants";
import { PORT } from '@/globals';

const Upload = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ videoAsset, setVideoAsset ] = useState<SanityAssetDocument>();
  const [ wrongFileType, setWrongFileType ] = useState(false);
  const [ caption, setCaption ] = useState('');
  const [ category, setCategory ] = useState(topics[0].name);
  const [ savingPost, setSavingPost ] = useState(false);

  const { userProfile }: {userProfile: any} = useAuthStore();
  const router = useRouter();

  const uploadVideo = async(e: any) => {
    setIsLoading(true);
    console.log(e.target.files[0]);
    
    const selectedFile = e.target.files[0];
    const fileTypes = [ 'video/WebM', 'video/mp4', 'video/ogg' ];

    if(fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      })
      .then((data) => {
        setVideoAsset(data);
        setIsLoading(false)
      })

    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  }

  const handlePost = async() => {
    if(caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }
      await axios.post(PORT + 'api/post', document)

      router.push('/')
    }
  }

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg w-[60%] xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-3'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-300 mt-1'>Post a video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[23vw] h-[380px] md:h-[330px] md:w-[230px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
              
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      loop
                      src={videoAsset.url}
                      controls
                    />
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Upload Video
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-8 text-sm leading-4">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#f9804b] text-center mt-8 rounded text-white text-md font-medium p-2 w-44 outline-none">Select file</p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    >

                    </input>
                  </label>
                )}
              </div>
            )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 width-[250px]">
                  Please select a video type
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-20 pb-10">
            <label className="text-md font-medium">Caption</label>
            <input 
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded outline-none text-md border-2 border-gray-200 lg:p-1 p-2"
            />
            <label className="text-md font-medium">Choose a Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-2 border-gray-200 text-md capitalize lg:p-1 p-2 rounded cursor-pointer"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg:slate-300"
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10" >
              <button
                onClick={() => {}}
                type='button'
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                type='button'
                className="bg-[#f9804b] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Post
              </button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Upload