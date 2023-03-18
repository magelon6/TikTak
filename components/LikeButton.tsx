import React, { useState } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../state/authStore'

const LikeButton = () => {

  const [liked, setLiked] = useState(true);
  const { userProfile } = useAuthStore();

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {liked ? (
          <div className="bg-primary rounded-full p-2 md:p-4   text-[#f51919]" onClick={handleDislike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4" onClick={handleLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}

      </div>
    </div>
  )
}

export default LikeButton