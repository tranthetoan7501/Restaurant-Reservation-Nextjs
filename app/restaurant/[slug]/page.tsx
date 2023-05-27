import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface RestaurantCardType {
  id: number;
  name: string;
  images: string[];
  slug: string;
  description: string;
}

const fetchRestaurants = async (slug: string): Promise<RestaurantCardType> => {
  const restaurants = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      slug: true,
      description: true,
    },
  });
  if (!restaurants) {
    throw new Error("Restaurant not found");
  }
  return restaurants;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  const restaurants = await fetchRestaurants(params.slug);
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavBar slug={restaurants.slug} />
        <Title name={restaurants.name} />
        <Rating />
        <Description description={restaurants.description} />
        <Images images={restaurants.images} />
        <Reviews />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
}
