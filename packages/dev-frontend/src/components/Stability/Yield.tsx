import React from "react";
import { Card, Paragraph, Text } from "theme-ui";
import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { InfoIcon } from "../InfoIcon";
import { Badge } from "../Badge";
import { useLQTYPrice } from "../../hooks/useLQTYPrice";

const selector = ({
  lusdInStabilityPool,
  remainingStabilityPoolLQTYReward,
}: LiquityStoreState) => ({
  lusdInStabilityPool,
  remainingStabilityPoolLQTYReward,
});

export const Yield: React.FC = () => {
  const {
    lusdInStabilityPool,
    remainingStabilityPoolLQTYReward,
  } = useLiquitySelector(selector);

  const lqtyPrice = useLQTYPrice();
  const hasZeroValue =
    remainingStabilityPoolLQTYReward.isZero || lusdInStabilityPool.isZero;

  if (hasZeroValue || lqtyPrice === undefined) return null;

  const yearlyHalvingSchedule = 0.5; // 50% see LQTY distribution schedule for more info
  const remainingLqtyOneYear = remainingStabilityPoolLQTYReward.mul(
    yearlyHalvingSchedule
  );
  const remainingLqtyOneYearInUSD = remainingLqtyOneYear.mul(lqtyPrice);
  const aprPercentage = remainingLqtyOneYearInUSD
    .div(lusdInStabilityPool)
    .mul(100);
  const remainingLqtyInUSD = remainingStabilityPoolLQTYReward.mul(lqtyPrice);

  if (aprPercentage.isZero) {
    return null;
  }

  return (
    <Badge>
      <Text>LQTY APR {aprPercentage.toString(2)}%</Text>
      <InfoIcon
        tooltip={
          <Card variant="tooltip" sx={{ width: ["220px", "518px"] }}>
            <Paragraph>
              An <Text sx={{ fontWeight: "bold" }}>estimate</Text> of the LQTY
              return on the LUSD deposited to the Stability Pool over the next
              year, not including your ETH gains from liquidations.
            </Paragraph>
            <Paragraph
              sx={{ fontSize: "12px", fontFamily: "monospace", mt: 2 }}
            >
              (($LQTY_REWARDS * YEARLY_DISTRIBUTION%) / DEPOSITED_LUSD) * 100 ={" "}
              <Text sx={{ fontWeight: "bold" }}> APR</Text>
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace" }}>
              ($
              {remainingLqtyInUSD.shorten()} * 50% / $
              {lusdInStabilityPool.shorten()}) * 100 =
              <Text sx={{ fontWeight: "bold" }}>
                {" "}
                {aprPercentage.toString(2)}%
              </Text>
            </Paragraph>
          </Card>
        }
      />
    </Badge>
  );
};
