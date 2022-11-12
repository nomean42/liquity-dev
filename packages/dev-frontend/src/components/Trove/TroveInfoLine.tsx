import React from "react";
import { OneLineInfo } from "../OneLineInfo";
import { Units } from "../../strings";
import { InfoIcon } from "../InfoIcon";
import { Card } from "theme-ui";
import { LUSD_LIQUIDATION_RESERVE, Percent } from "@liquity/lib-base";

interface IProps {
  fee: any;
  totalDebt: any;
  isDirty: boolean;
  borrowingRate: any;
}

export const TroveInfoLine: React.FC<IProps> = ({
  isDirty,
  fee,
  totalDebt,
  borrowingRate,
}) => {
  const feePct = new Percent(borrowingRate);

  return (
    <OneLineInfo
      infoElements={[
        {
          title: "Liquidation Reserve",
          inputId: "trove-liquidation-reserve",
          amount: LUSD_LIQUIDATION_RESERVE.prettify(),
          unit: Units.COIN,
          infoIcon: (
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ width: "200px" }}>
                  An amount set aside to cover the liquidator’s gas costs if
                  your Trove needs to be liquidated. The amount increases your
                  debt and is refunded if you close your Trove by fully paying
                  off its net debt.
                </Card>
              }
            />
          ),
        },
        {
          title: "Borrowing Fee",
          inputId: "trove-borrowing-fee",
          amount: fee.prettify(2),
          pendingAmount: feePct.toString(2),
          unit: Units.COIN,
          infoIcon: (
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ width: "240px" }}>
                  This amount is deducted from the borrowed amount as a one-time
                  fee. There are no recurring fees for borrowing, which is thus
                  interest-free.
                </Card>
              }
            />
          ),
        },
        {
          title: "Total debt",
          inputId: "trove-total-debt",
          amount: totalDebt.prettify(2),
          unit: Units.COIN,
          infoIcon: (
            <InfoIcon
              tooltip={
                <Card variant="tooltip" sx={{ width: "240px" }}>
                  The total amount of LUSD your Trove will hold.{" "}
                  {isDirty && (
                    <>
                      You will need to repay{" "}
                      {totalDebt.sub(LUSD_LIQUIDATION_RESERVE).prettify(2)} LUSD
                      to reclaim your collateral (
                      {LUSD_LIQUIDATION_RESERVE.toString()} LUSD Liquidation
                      Reserve excluded).
                    </>
                  )}
                </Card>
              }
            />
          ),
        },
      ]}
    />
  );
};
