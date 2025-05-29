import Link from "next/link";
import Image from "next/image";

const ProfilCard
: React.FC = () => {



return (

    <div className=" flex items-center justify-center w-1/5 h-32 mx-4 my-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
        <Link
        href="/profil"
        className="flex  w-full justify-evenly"
        >
        <Image src={"/assets/images/baby-foot.jpg"} alt="image profil" width={85} height={85} className="mr-3 rounded-xl h-24 w-24"></Image>
        <div className=" flex flex-col justify-around">
            <p className="text-center font-semibold text-[#5248B5]">Arthur Immo</p>
            <div className="flex justify-between mt-5"> 
            <Image src={"/assets/mail.svg"} alt="image profil" width={24} height={24} className="rounded-xl "></Image>
            <Image src={"/assets/notifications.svg"} alt="image profil" width={24} height={24} className="rounded-xl "></Image>
            <Image src={"/assets/settings.svg"} alt="image profil" width={24} height={24} className="rounded-xl "></Image>
            </div>
        </div>
        </Link>
    </div>

)

}

export default ProfilCard;