import React from 'react';
import Link from 'next/link'; // Importation du composant Link de Next.js

const SidebarRight: React.FC = () => {
    return (
        <div className="m-4 w-1/5 border-solid border-2 drop-shadow-lg rounded-lg" >
            <h2 className='font-bold'>Navigation</h2>
            <ul>
                <li className='my-5 text-emerald-800 font-bold'>
                    <Link href="/">Accueil</Link>
                </li>
                <li className='my-5'>
                    <Link href="/ActivitiesList">Activité</Link>
                </li>
                <li className='my-5'>
                    <Link href="/Schedule">Planning</Link>
                </li>
                <li className='my-5'>
                    <Link href="/Groups">Groupes et animateurs</Link>
                </li>
                <li className='my-5'>
                    <Link href="/Profil">Mon profil</Link>
                </li>
                <li className='my-5'>
                    <Link href="/MyChildrens">Mes enfants</Link>
                </li>
            </ul>
            <h2 className='font-bold'>Explorer</h2>
            <ul>
                <li className='my-5'>
                    <Link href="/SharingMoments">Moments partagés</Link>
                </li>
                <li className='my-5'>
                    <Link href="/ClassementAndBadge">Classement et badge</Link> {/* Vous pouvez modifier l'URL si nécessaire */}
                </li>
                <li className='my-5'>
                    <Link href="/Events">Événements</Link> {/* De même, ajustez le nom de la route si nécessaire */}
                </li>
                <li className='my-5'>
                    <Link href="/BlogAndConseils">Blog & Conseils</Link> {/* Ajustez si nécessaire */}
                </li>
                <li className='my-5'>
                    <Link href="/Recommendations">Recommandation</Link> {/* Idem */}
                </li>
                <li className='mt-[150px] mb-5'>
                    <Link href="/Logout">Déconnexion</Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarRight;
