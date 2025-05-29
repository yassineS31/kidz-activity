import Link from "next/link";
import Image from "next/image";

const LogoCard
: React.FC = () => {



return (

    <div className=" flex items-center justify-center w-1/5 h-32 mx-4 my-2"> 
        <Link
        href="/"
        className="flex  w-full justify-evenly"
        >
        <Image src={"/assets/images/Logo.png"} alt="image profil" width={250} height={120} className="rounded-xl h-[120px] w-[250px]"></Image>
        </Link>
    </div>

)

}

export default LogoCard;