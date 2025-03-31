"use client"; 
import { useState } from "react";
import CardActivity from "@/Components/CardActivity";
import Pagination from "@/Components/ui/pagination";


const activities = [
    { id: 1, title: 'Football', categorie: 'sport' },
    { id: 2, title: 'Peinture', categorie: 'art' },
  ];
  
const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Remplace par le nombre total de pages disponibles

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Page actuelle: ${page}`);
    };


    return (
        <div className=" flex-1 items-center justify-center my-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
            <h1>Page activité !!</h1>
            <div className="flex justify-center flex-wrap gap-2">
            {activities.map((activity) => (
            <CardActivity key={activity.id} {...activity} />
        ))}
            </div>
            <div className="flex mt-5 justify-center items-center">
            <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}>
            </Pagination>
            </div>

        </div>
    )
}

export default HomePage;