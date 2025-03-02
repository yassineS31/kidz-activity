import Link from "next/link";
import Image from "next/image";

const LogoCard
: React.FC = () => {



return (

    <div className=" flex items-center justify-center w-1/5 h-32 mx-4 my-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
        <Link
        href="/accueil"
        className="flex  w-full justify-evenly"
        >
        <Image src={"/images/Logo.png"} alt="image profil" width={100} height={100} className="rounded-xl h-24 w-24"></Image>
        </Link>
    </div>

)

}

export default LogoCard;