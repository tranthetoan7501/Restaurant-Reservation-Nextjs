import { PRICE } from "@prisma/client";

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = (price: PRICE) => {
    switch (price) {
      case PRICE.CHEAP:
        return (
          <>
            <span>$$</span>
            <span className='text-gray-400'>$$</span>
          </>
        );
      case PRICE.REGULAR:
        return (
          <>
            <span>$$$</span>
            <span className='text-gray-400'>$</span>
          </>
        );
      case PRICE.EXPENSIVE:
        return (
          <>
            <span>$$$$</span>
          </>
        );
      default:
        return (
          <>
            <span className='text-reg font-light mr-3'>$$$$</span>
          </>
        );
    }
  };
  return renderPrice;
};

export default Price;
