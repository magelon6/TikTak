import axios from "axios";
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

export const getServerSideProps = async ({query: { topic }}: {query: {topic: string}}) => {

    let response = null

    if(topic) {
        console.log(topic);
        
        response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`)
    } else {
        response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
    }

    return {
        props: {
            videos: response.data,
        }
    }
} 

export default Home