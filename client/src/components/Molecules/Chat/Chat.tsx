import React from "react";
import AddButton from '../../Atoms/Inputs/AddButton/AddButton';
import io from "socket.io-client";
const PORT = import.meta.env.VITE_LOCAL_HOST
const socket = io(PORT)

export default function Chat() {
  return <div className='absolute right-0 top-0'>
    <input type="text" />
    <input className="flex justify-center items-center font-black rounded-full py-1 px-3 text-white font-sans text-xl w-fit ml-15 cursor-pointer" style={background} type="button" value='Añadir' />
    </div>;
}
