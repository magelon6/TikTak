import type { NextPage } from "next";
import axios from "axios";
import { PORT } from "@/globals";

const Home: NextPage = ({ videos }) => {
    console.log(videos)
  return (
      <h1 className="text-3xl font-bold underline">
          Home page
      </h1>
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