"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Importation du composant Link de Next.js
import { Calendar } from './ui/calendar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
const SidebarRight: React.FC = () => {
const [isCollapsed, setIsCollapsed] = useState(false);

const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
};

    return (
        <div
            className={`transition-all duration-300 ${
                isCollapsed ? 'w-[100px]' : 'w-1/5'
            } m-4 drop-shadow-lg rounded-lg flex flex-col items-center bg-white`}
        >
      {/* Icone de réduction */}
    <svg
        onClick={toggleSidebar}
        className="my-5 ml-2 self-start cursor-pointer"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 26L9.5 18.5M9.5 18.5V24.5M9.5 18.5H3.5M26 2L18.5 9.5M18.5 9.5V3.5M18.5 9.5H24.5"
          stroke="#333333"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Contenu de la sidebar */}
      <Calendar className={`my-5 ${ isCollapsed ? 'hidden' : 'flex'}`} />
      <h2 className="font-bold my-6 flex items-center gap-2">Événements</h2>
      <ul>
        {[
          { id: 1, name: 'Chasse au trésor', date: '08 Avril 2025' },
          { id: 2, name: 'Lecture collective', date: '05 Juin 2025' },
          { id: 3, name: 'La nuit des étoiles', date: '23 Juillet 2025' },
          { id: 4, name: 'VTT avec parents', date: '11 Juillet 2025' },
          { id: 5, name: 'Atelier créatif', date: '17 Août 2025' },
        ].map((event) => (
          <Link href="#" key={event.id}>
            <li className="my-3 flex flex-col">
              <p>{event.id}. {event.name}</p>
              <span className="text-center">{event.date}</span>
              <Separator />
            </li>
          </Link>
        ))}
      </ul>
      <Button variant="greenway" size="rounded">Voir plus</Button>
      <p className='my-4'>Animateurs populaire</p>
      {/* Suite à construire : Liste des animateurs populaires (photo + nom ) Btn "voir plus" Liste des suivi (photo + nom ) 
      Btn "voir plus" Liste des recommandation (photo + nom ) Btn "voir plus" */}
    </div>
  );
};

export default SidebarRight;
