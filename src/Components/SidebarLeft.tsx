"use client";
import React, { useState } from "react";
import Link from "next/link";
// Icons
import {
  MdExplore,
  MdOutlineArticle,
  MdRecommend,
  MdLogout,
  MdEventNote,
  MdHome,
} from "react-icons/md";
import { FaChildren, FaUser, FaUsers } from "react-icons/fa6";
import { TbPhotoHeart } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";

// Component
const SidebarLeft: React.FC = () => {
  // State
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[100px]" : "w-1/5"
      } 
      m-4 drop-shadow-lg rounded-lg flex flex-col items-center bg-white`}
    >
      <div className="w-full flex items-center justify-between">
        <h2
          className={` ${
            isCollapsed ? "hidden" : "inline"
          } font-bold my-5 text-center w-full `}
        >
          Navigation
        </h2>
        <svg
          onClick={toggleSidebar}
          className={`${
            isCollapsed ? "hidden" : "size-7"
          }  my-5 mr-2 ml-auto cursor-pointer`}
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
        <svg
            onClick={toggleSidebar}
            className={`${isCollapsed ? 'size-5' : 'hidden'} my-5 mr-2 ml-auto cursor-pointer` }
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 17H1M1 17V13M1 17L7 11M13 1H17M17 1V5M17 1L11 7"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
      </div>

      <ul className="flex flex-col items-left ">
        <li>
          <Link
            href="/"
            className="my-3 text-emerald-800 font-bold flex items-center gap-2"
          >
            <MdHome
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Accueil
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/ActivitiesList"}
            className="my-3 flex items-center gap-2"
          >
            <svg
              width="40"
              height="40"
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.25 15.7V5.9875C21.25 4.19636 19.8036 2.75 18.0125 2.75H5.9875C4.19636 2.75 2.75 4.19636 2.75 5.9875V18.0125C2.75 19.8036 4.19636 21.25 5.9875 21.25H15.7L21.25 15.7ZM5.9875 19.4C5.22227 19.4 4.6 18.7777 4.6 18.0125V5.9875C4.6 5.22227 5.22227 4.6 5.9875 4.6H18.0125C18.7777 4.6 19.4 5.22227 19.4 5.9875V14.775H18.0125C16.2214 14.775 14.775 16.2214 14.775 18.0125V19.4H5.9875ZM9.93136 9.94818C9.6875 9.09045 8.79614 8.58591 7.93841 8.82977C7.08068 9.07364 6.57614 9.965 6.82 10.8311C6.88727 11.0666 7.005 11.2768 7.15636 11.4534L9.965 10.663C10.007 10.4275 9.99864 10.1836 9.93136 9.94818ZM15.7168 8.31682C15.4814 7.45909 14.5816 6.95455 13.7239 7.19841C12.8661 7.44227 12.3616 8.33364 12.6055 9.19977C12.6727 9.43523 12.7905 9.64545 12.9418 9.82205L15.7505 9.03159C15.7925 8.79614 15.7841 8.55227 15.7168 8.31682ZM16.5409 11.2095L7.62727 13.7239C8.82977 15.3132 10.9152 16.0868 12.9418 15.515C14.9684 14.9432 16.3391 13.1857 16.5409 11.2095Z"
                fill="#333333"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Activité
            </span>
          </Link>
        </li>
        <li>
          <Link href={"/Schedule"} className="my-3 flex items-center gap-2 ">
            <MdEventNote
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Planning
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Groups" className="my-3 flex items-center gap-2">
            <FaUsers
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Groupes
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Profil" className="my-3 flex items-center gap-2">
            <FaUser
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Mon profil
            </span>
          </Link>
        </li>
        <li>
          <Link href="/MyChildrens" className="my-3 flex items-center gap-2">
            <FaChildren
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Mes enfants
            </span>
          </Link>
        </li>
      </ul>
      <h2 className="font-bold my-8 flex items-center gap-2">
        <MdExplore
          className={`${isCollapsed ? "justify-self-center size-8" : "icon"}`}
        />
        <span className={`${isCollapsed ? "hidden" : "inline"}`}>Explorer</span>
      </h2>
      <ul className="flex flex-col items-left">
        <li>
          <Link
            href="/SharingMoments"
            className=" my-3 flex items-center gap-2"
          >
            <TbPhotoHeart
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>Feed</span>
          </Link>
        </li>
        <li>
          <Link href="/Ranking" className=" my-3 flex items-center gap-2">
            <svg
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.4 25V19.0002C9.4 17.8686 9.4 17.3034 9.0484 16.9518C8.6968 16.6002 8.1316 16.6002 7 16.6002H6.4C4.702 16.6002 3.8536 16.6002 3.328 17.1282C2.8 17.655 2.8 18.5034 2.8 20.2001V25H9.4ZM9.4 25H16.6M9.4 25V17.8002C9.4 16.1034 9.4 15.255 9.928 14.7283C10.4536 14.2003 11.302 14.2003 13 14.2003C14.698 14.2003 15.5452 14.2003 16.072 14.7283C16.6 15.255 16.6 16.1034 16.6 17.8002V25M16.6 25H23.2V22.6001C23.2 20.9033 23.2 20.0549 22.672 19.5281C22.1452 19.0002 21.2968 19.0002 19.6 19.0002H19C17.8684 19.0002 17.3032 19.0001 16.9516 19.3517C16.6 19.7033 16.6 20.2685 16.6 21.4001V25ZM1 25H25M13.8292 1.69418L14.674 3.39814C14.7457 3.52581 14.8434 3.63698 14.9608 3.72443C15.0782 3.81187 15.2127 3.87364 15.3556 3.90573L16.8868 4.16132C17.866 4.32572 18.0964 5.0421 17.3908 5.74888L16.2004 6.94885C16.0961 7.06698 16.0195 7.20697 15.9763 7.35855C15.9331 7.51012 15.9244 7.66945 15.9508 7.82483L16.2916 9.31039C16.5604 10.4864 15.9412 10.9412 14.9092 10.3268L13.474 9.46999C13.3272 9.39383 13.1642 9.35407 12.9988 9.35407C12.8334 9.35407 12.6704 9.39383 12.5236 9.46999L11.0884 10.3268C10.0612 10.9412 9.4372 10.4816 9.706 9.31039L10.0468 7.82483C10.0732 7.66945 10.0645 7.51012 10.0213 7.35855C9.97812 7.20697 9.90154 7.06698 9.7972 6.94885L8.608 5.74888C7.9072 5.0421 8.1328 4.32572 9.112 4.16132L10.642 3.90573C10.7841 3.87289 10.9177 3.81066 11.0343 3.72303C11.1509 3.63539 11.2478 3.52431 11.3188 3.39694L12.1636 1.69298C12.6244 0.769006 13.3732 0.769006 13.8292 1.69298"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Classement
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Events" className=" my-3 flex items-center gap-2">
            <IoCalendarOutline
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Événements
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/BlogAndConseils"
            className=" my-3 flex items-center gap-2"
          >
            <MdOutlineArticle
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>Blog</span>
          </Link>
        </li>
        <li>
          <Link
            href="/Recommendations"
            className=" my-3 flex items-center gap-2"
          >
            <MdRecommend
              className={`${
                isCollapsed ? "justify-self-center size-8" : "icon"
              }`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Pour vous
            </span>
          </Link>
        </li>
      </ul>
      <Link href="/Logout" className=" mt-32 flex items-center gap-2">
        <MdLogout
          className={`${isCollapsed ? "justify-self-center size-8 my-4" : "icon"} `  }
        />
        <span className={`${isCollapsed ? "hidden" : "inline"}`}>
          Déconnexion
        </span>
      </Link>
    </div>
  );
};

export default SidebarLeft;
