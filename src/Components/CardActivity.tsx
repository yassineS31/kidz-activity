import Image from "next/image";
import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const bgColors = [
  "bg-red-light",
  "bg-purple-light",
  "bg-green-light",
  "bg-orange-light",
];

const textColors = ["text-red", "text-purple", "text-green", "text-orange"];

const CardActivity = ({
  id,
  title,
  categorie,
  price,
  user,
  description,
  time,
  index,
}: {
  id: number;
  title: string;
  categorie: string;
  price: string;
  user: string;
  description: string;
  time: string;
  index: number;
}) => {
  const bgColor = bgColors[index % bgColors.length]; // Cyclique
  const textColor = textColors[index % textColors.length]; // Cyclique
  return (
    <div
      className={`relative max-w-[250px] h-[400px] ${bgColor} border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700`}
    >
      <Link href={`/Activite/${categorie}/${id}`}>
        <div className="absolute bg-black/50 h-8 w-full rounded-t-lg flex pl-4 justify-center items-center gap-1 ">
          <BsPlusSquare color="white" />
          <p className={`${textColor}`}>Inviter</p>
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

        <Image
          src={"/assets/images/museum.jpg"}
          alt="image profil"
          width={250}
          height={200}
          className="rounded-t-lg h-[200px]"
        ></Image>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className={`${textColor}`}>{title}</p>
            <p className={`${textColor} font-medium`}>{time}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className={`${textColor} text-sm font-semibold `}>Prix</p>
            <p className={`${textColor} text-sm`}>{price}€</p>
          </div>
          <p
            className={`${textColor} my-3 text-sm font-normal text-gray-700 dark:text-gray-400`}
          >
            {description}
          </p>
          <div className="w-full mt-6 flex justify-around items-center gap-2">
            <p className={`${textColor} text-sm font-semibold`}>{user}</p>
            <Button variant="greenway" size="small">
              Reserver
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CardActivity;
