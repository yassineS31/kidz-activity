
import SidebarLeft from "@/Components/SidebarLeft";
import SidebarRight from "@/Components/SidebarRight";
import HomePage from "@/View/Home";




export default function Home() {
  return (
    <div className="flex">
<SidebarLeft/>
<HomePage/>
<SidebarRight/>
    </div>
  );
}
