import NavBar from "@/app/components/NavBar";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";

export default function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      {/* RESAURANT NAVBAR */}
      <RestaurantNavBar slug={params.slug} />
      {/* RESAURANT NAVBAR */} {/* MENU */}
      <Menu />
      {/* MENU */}
    </div>
  );
}
