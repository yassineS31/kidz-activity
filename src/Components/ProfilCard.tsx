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
        <Image src={"/images/baby-foot.jpg"} alt="image profil" width={100} height={100} className="rounded-xl h-24 w-24"></Image>
        <div className=" flex flex-col justify-around">
            <p className="text-center font-semibold">Arthur Immo</p>
            <div className="mt-5"> 
                <p className="text-center self-end">icon1 icon2 icon3</p>
            </div>
        </div>
        </Link>
    </div>

)

}

export default ProfilCard;