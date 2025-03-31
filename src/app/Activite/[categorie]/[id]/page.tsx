import { Button } from "@/Components/ui/button";
import Image from "next/image";
import { FC } from "react";
interface ActivityPageProps {
    params: { categorie: string; id: string ,title:string};
}

    const ActivityPage: FC<ActivityPageProps> = ({ params }) => {
    const { categorie, id,title } = params;

    return (
        <div className=" flex-1 items-center justify-center my-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
        <div className="w-full h-72 relative rounded-t-[8px] overflow-hidden">
            <Image src={"/images/baby-foot.jpg"} alt="Image baby foot" 
            fill
            style={{ objectFit: "cover" }}></Image>
        </div>
        <Button className="mt-5" variant="greenway" size="rounded">Retour</Button>
        <h1>titre :{title}</h1>
        <h1>Catégorie : {categorie}</h1>
        <h2>Annonce ID : {id}</h2>
    </div>
    );
};

export default ActivityPage;
