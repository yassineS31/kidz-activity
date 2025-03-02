import Image from "next/image";
import Link from "next/link";

export function CardActivity()  {
    return (
<div className="max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <Link
    href={"/museum"}
    >
    <Image src={"/images/museum.jpg"} alt="image profil" width={250} height={100} className="rounded-t-lg"></Image>
    <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-800 rounded-lg hover:bg-emerald-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </div>
    </div>
    </Link>
</div>
    )
}
export default CardActivity