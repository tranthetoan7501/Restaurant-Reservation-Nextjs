import Link from "next/link";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fetchRestaurantByCity = (city: string | undefined) => {
  if (!city) return prisma.restaurant.findMany();
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: { equals: city.toLowerCase() },
      },
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
    },
  });
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string };
}) {
  const restaurants = await fetchRestaurantByCity(searchParams.city);
  console.log(restaurants);
  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        {/* SEARCH SIDE BAR */}
        <SearchSideBar />
        {/* SEARCH SIDE BAR */}
        <div className='w-5/6'>
          {restaurants.length ? (
            <RestaurantCard />
          ) : (
            <div>Sorry, we found no restaurants in this area</div>
          )}
        </div>
      </div>
    </>
  );
}
