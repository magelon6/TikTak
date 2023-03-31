import axios from 'axios';
import jwt_decode from "jwt-decode";


interface GoogleAuthRes {
    name: string,
    picture: string,
    sub: string,
}


export const createOrGetUser = async (response: any, addUser: any) => {
    const decode: GoogleAuthRes = jwt_decode(response.credential);
    
    const { name, picture, sub } = decode;
    
    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    };
    
    addUser(user);
    
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, user );

}