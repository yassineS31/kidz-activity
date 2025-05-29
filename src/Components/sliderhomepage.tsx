// import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
export interface ImageActivity {
  title: string;
  imageUrl: string;
}

export const works: ImageActivity[] = [
  {
    title: "Cuisine",
    imageUrl:"/assets/images/cook.jpg",
  },
  {
    title: "Art",
    imageUrl: "/assets/images/museum.jpg",
  },
  {
    title: "Peinture",
    imageUrl: "/assets/images/painting.jpg",
  },
  {
    title: "Lecture",
    imageUrl: "/assets/images/books.jpg",
  },
  {
    title: "Football",
    imageUrl: "/assets/images/baby-foot.jpg",
  },
  {
    title: "VTT",
    imageUrl: "/assets/images/biking.jpg",
  }

];

export function ScrollAreaHorizontal() {
    return (
        <ScrollArea className="relative h-78 overflow-hidden rounded-xl border bg-white shadow-md">
            
            <div className="flex justify-between p-2">
                <p> Top activité</p>
                <p>Voir tout</p>
            </div>
        <div className="flex w-max gap-2 p-4 ">
            {works.map((ImageActivity, index) => (
            <div
                key={index}
                className="relative shrink-0 w-[150px] h-[200px] overflow-hidden rounded-md shadow-md"
            >
            <Image
            priority={true}
            src={ImageActivity.imageUrl}
            alt={ImageActivity.title}
            className="h-full w-full object-cover "
            width={150}
            height={200}
            />

                {/* Title */}
                <div className="absolute top-0 left-0 w-full bg-black/50 py-1 text-center text-sm font-semibold text-yellow-400 hover:text-yellow-300">
                {ImageActivity.title}
                </div>

                {/*Button*/}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent py-4 text-center">
                <button className="text-yellow-400 hover:text-yellow-300 text-sm font-bold">
                    En savoir plus
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* ScrollBar */}
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
  );
}
