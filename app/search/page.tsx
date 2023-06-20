import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
const fetchRestaurantByCity = (searchParams: SearchParams) => {
  const where: any = {};
  if (searchParams.city) {
    where.location = {
      name: { equals: searchParams.city.toLowerCase() },
    };
  }
  if (searchParams.cuisine) {
    where.cuisine = {
      name: { equals: searchParams.cuisine.toLowerCase() },
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    cuisine: true,
    location: true,
    price: true,
  };
  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations;
};
const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany();
  return cuisines;
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        {/* SEARCH SIDE BAR */}
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        {/* SEARCH SIDE BAR */}
        <div className='w-5/6'>
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </>
          ) : (
            <div>Sorry, we found no restaurants in this area</div>
          )}
        </div>
      </div>
    </>
  );
}
