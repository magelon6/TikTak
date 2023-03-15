import axios from 'axios';
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface GoogleAuthRes {
    name: string,
    picture: string,
    sub: string,
}

export const createOrGetUser = async (response: any) => {
    const decode: GoogleAuthRes = jwt_decode(response.credential);

    const { name, picture, sub } = decode;
    
    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    };
    
    console.log(BASE_URL);
    
    await axios.post(`${BASE_URL}/api/auth`, user );

}