import type { NextPage } from "next";
import axios from "axios";
import { PORT } from "@/globals";
import type { Video } from '../../types';
import NoResults from "components/NoResults";
import VideoCard from "components/VideoCard";

interface IProps {
    videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
      <div className="flex flex-col gap-10 videos h-full">
        { videos.length ? (
           videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
           )) 
        ) : (
            <NoResults text={'Whoooop\'s there is no Videos'}/>
        )}
      </div>
  )
}

export async function getServerSideProps() {

    const { data } = await axios.get(`${PORT}/api/post`)

    return {
        props: {
            videos: data,
        }
    }
} 

export default Home