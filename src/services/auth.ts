import { v4 as uuid } from 'uuid';

interface SignInRequestData{
  email: string;
  password: string
}

const delay = async(qtd = 600) => new Promise(resolve => setTimeout(resolve, qtd))

export async function SignInRequest(data: SignInRequestData){
 await delay();

  return{
    token: uuid(),
    user:{
      name: 'Thiago Mota',
      email: 'Thiago@gmail.com',
      avatar_url:'http://github.com/Thiago-Mota-Santos.png'
    }
  }
}