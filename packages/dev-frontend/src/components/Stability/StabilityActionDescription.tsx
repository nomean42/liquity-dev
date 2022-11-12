import React from "react";

import {
  Decimal,
  StabilityDeposit,
  StabilityDepositChange,
} from "@liquity/lib-base";

import { Units } from "../../strings";
import { ActionDescription, Amount } from "../ActionDescription";

type StabilityActionDescriptionProps = {
  originalDeposit: StabilityDeposit;
  change: StabilityDepositChange<Decimal>;
};

export const StabilityActionDescription: React.FC<StabilityActionDescriptionProps> = ({
  originalDeposit,
  change,
}) => {
  const collateralGain = originalDeposit.collateralGain.nonZero
    ?.prettify(4)
    .concat(" ", Units.ETH);
  const lqtyReward = originalDeposit.lqtyReward.nonZero
    ?.prettify()
    .concat(" ", Units.GT);

  return (
    <ActionDescription>
      {change.depositLUSD ? (
        <>
          You are depositing{" "}
          <Amount>
            {change.depositLUSD.prettify()} {Units.COIN}
          </Amount>{" "}
          in the Stability Pool
        </>
      ) : (
        <>
          You are withdrawing{" "}
          <Amount>
            {change.withdrawLUSD.prettify()} {Units.COIN}
          </Amount>{" "}
          to your wallet
        </>
      )}
      {(collateralGain || lqtyReward) && (
        <>
          {" "}
          and claiming at least{" "}
          {collateralGain && lqtyReward ? (
            <>
              <Amount>{collateralGain}</Amount> and{" "}
              <Amount>{lqtyReward}</Amount>
            </>
          ) : (
            <Amount>{collateralGain ?? lqtyReward}</Amount>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};
