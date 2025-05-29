"use client"; 
import { useState } from "react";
import CardActivity from "@/Components/CardActivity";
import Pagination from "@/Components/ui/pagination";


const activities = [
    { id: 1,user:'Marie Manoirs', title: 'Football', categorie: 'sport',price:'35',time:"10:00 - 15:30,",description:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."},
    { id: 2,user:'Thomas Levier', title: 'Peinture', categorie: 'art',price:'15',time:"14:00 - 17:00,",description:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order." },
    { id: 3,user:'Thomas Levier', title: 'Peinture', categorie: 'art',price:'15',time:"14:00 - 17:00,",description:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order." },
    { id: 4,user:'Thomas Levier', title: 'Peinture', categorie: 'art',price:'15',time:"14:00 - 17:00,",description:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order." },
    { id: 5,user:'Thomas Levier', title: 'Peinture', categorie: 'art',price:'15',time:"14:00 - 17:00,",description:"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order." },
  ];
  
const ActiviteListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Remplace par le nombre total de pages disponibles

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Page actuelle: ${page}`);
    };


    return (
        <div className=" flex-1 items-center justify-center my-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 
            <h1>Voici la liste des activités proposés par nos adhérents ! </h1>
            {/* Badge section */}
            <div className="w-full ">

            </div>
            <div className="flex justify-center flex-wrap gap-3">
            {activities.map((activity,index) => (
            <CardActivity key={activity.id} index={index} {...activity} />
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

export default ActiviteListPage;