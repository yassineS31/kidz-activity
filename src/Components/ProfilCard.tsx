import Link from "next/link";
import Image from "next/image";

const ProfilCard
: React.FC = () => {



return (
    <div className="w-1/5 h-48 rounded-xl mx-4 mt-4 bg-purple-200">
        <p>Salut Nom Prénom !</p>
    <Image src={"/images/baby-foot.jpg"} alt="image profil" width={100} height={100} className="rounded-xl"></Image>
    </div>
)
}

export default ProfilCard;