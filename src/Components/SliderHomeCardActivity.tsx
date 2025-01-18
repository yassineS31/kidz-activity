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
    imageUrl: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1520975919019-094b7174a6ca?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1508264165352-258a7f6a26c9?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1508264165352-258a7f6a26c9?auto=format&fit=crop&w=300&q=80",
  }

];

export function ScrollAreaHorizontal() {
    return (
        <ScrollArea className="relative h-80 overflow-hidden rounded-xl border bg-white shadow-md">
            <div className="flex justify-between p-3">
                <p> Top activité</p>
                <p>Voir tout</p>
            </div>
        <div className="flex w-max gap-2 p-4 mt-4">
            {works.map((ImageActivity, index) => (
            <div
                key={index}
                className="relative shrink-0 w-[150px] h-[200px] overflow-hidden rounded-md shadow-md"
            >
            <Image
            src={ImageActivity.imageUrl}
            alt={ImageActivity.title}
            className="h-full w-full object-cover"
            width={150}
            height={200}
            />

                {/* Titre en haut avec fond transparent */}
                <div className="absolute top-0 left-0 w-full bg-black/50 py-2 text-center text-sm font-semibold text-white">
                {ImageActivity.title}
                </div>

                {/* Bouton en bas */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent py-4 text-center">
                <button className="text-yellow-400 hover:text-yellow-300 text-sm font-bold">
                    En savoir plus
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* Barre de défilement */}
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
  );
}
