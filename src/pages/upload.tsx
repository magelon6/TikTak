import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client'; 

import useAuthStore from 'state/authStore';
import { client } from 'utils/client';

const Upload = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ videoAsset, setVideoAsset ] = useState<SanityAssetDocument>();
  const [ wrongFileType, setWrongFileType ] = useState(false)

  const uploadVideo = async(e: any) => {
    setIsLoading(true);
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

  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-300 mt-1'>Post a video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[230px] h-[380px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>

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
                      <p className="text-gray-400 text-center mt-8 text-sm leading-10">
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
          </div>

        </div>
      </div>

    </div>
  )
}

export default Upload