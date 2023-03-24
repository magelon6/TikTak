import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from 'state/authStore'
import NoResults from './NoResults'

import { IUser } from 'types'

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string, _id: string };
}

const Comments = ({ comments, setComment, addComment, comment, isPostingComment }: IProps) => {

  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>
            {comments.map((item, idx) => (
              <>
                {allUsers.map((user: IUser) => (
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold roundned">
                          <Image 
                            src={user.image}
                            width={34}
                            height={34}
                            className="rounded-full"
                            alt="user profile image"
                          />
                        </div>
                        <div className="hidden xl:block">
                          <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                            {user.userName}
                            <GoVerified className="text-blue-400" />
                          </p>
                          <p className="capitalize text-gray-400 text-xs">
                            {user.userName}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
                ))}
              </>
            ))}
          </div>
        ) : (
          <NoResults text="No comments" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment...'
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button onClick={addComment} className="text-md text-gray-400">
              {isPostingComment ? 'loader' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments