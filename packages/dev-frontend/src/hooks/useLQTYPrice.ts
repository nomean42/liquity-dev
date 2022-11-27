import { Decimal } from "@liquity/lib-base";
import { useEffect, useState } from "react";
import { fetchLqtyPrice } from "../components/Stability/context/fetchLqtyPrice";

export const useLQTYPrice = (): Decimal | undefined => {
  const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const { lqtyPriceUSD } = await fetchLqtyPrice();
        setLqtyPrice(lqtyPriceUSD);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return lqtyPrice;
};
