

import Image from "next/image";
import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";
import { Avatar,AvatarImage } from "@radix-ui/react-avatar";


const CardActivity = ({ id, title, categorie }: { id: number; title: string; categorie: string }) => {

    return (
<div className="relative max-w-[250px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <Link href={`/Activite/${categorie}/${id}`}>
    <div className="absolute bg-black/50 h-8 w-full rounded-t-lg flex pl-4 justify-center items-center gap-1 ">
    <BsPlusSquare 
    color="white"
    />    
    <p className="text-white">Inviter</p>
    <Avatar className="">
    <AvatarImage 
    src="https://github.com/shadcn.png" 
    width={24}
    height={24}
    className="rounded-full border border-white"
    />
    </Avatar>
    <Avatar className="-ml-2">
    <AvatarImage 
    src="https://github.com/shadcn.png" 
    width={24}
    height={24}
    className="rounded-full border border-white"

    />
    </Avatar>
    <Avatar className="-ml-2">
    <AvatarImage 
    src="https://github.com/shadcn.png" 
    width={24}
    height={24}
    className="rounded-full border border-white"
    />
    </Avatar>
    </div>


    <Image src={"/images/museum.jpg"} alt="image profil" width={250} height={200} className="rounded-t-lg h-[200px]"></Image>
    <div className="p-4">
        <div className="flex justify-between items-center">
            <p className="text-[10px]">{title}</p>
            <p className="text-[10px] font-medium">Horaire 10:00 - 15:30</p>
        </div>
        <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] font-medium" >Prix</p>
            <p className="text-xs">35€</p>
        </div>
        <p className="my-3 text-sm font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <p className="text-sm font-semibold mt-6">Marie Manoirs </p>
    </div>
    </Link>
</div>
    )
}
export default CardActivity