import React from "react";
import { OneLineInfo } from "../OneLineInfo";
import { InfoIcon } from "../InfoIcon";
import { Box, Card } from "theme-ui";
import {
  MINIMUM_COLLATERAL_RATIO,
  CRITICAL_COLLATERAL_RATIO,
  Decimal,
  Difference,
  LiquityStoreState,
  Percent,
} from "@liquity/lib-base";
import { Icon } from "../Icon";
import { ActionDescription } from "../ActionDescription";
import { useLiquitySelector } from "@liquity/lib-react";

interface IProps {
  value?: Decimal;
  change?: Difference;
}

export const CollateralRatioInfoLine: React.FC<IProps> = ({
  value,
  change,
}) => {
  const collateralRatioPct = new Percent(value ?? { toString: () => "N/A" });
  const changePct = change && new Percent(change);
  const color = value?.gt(CRITICAL_COLLATERAL_RATIO)
    ? "success"
    : value?.gt(1.2)
    ? "warning"
    : value?.lte(1.2)
    ? "danger"
    : "muted";
  const ethPrice = useLiquitySelector(({ price }: LiquityStoreState) => price);
  const liquidationPrice = ethPrice
    .div(value?.div(MINIMUM_COLLATERAL_RATIO) ?? 1)
    .prettify();
  return value ? (
    <>
      <OneLineInfo
        infoElements={[
          {
            title: "Collateral ratio",
            inputId: "trove-collateral-ratio",
            amount: collateralRatioPct.prettify(),
            color,
            pendingAmount: change?.positive?.absoluteValue?.gt(10)
              ? "++"
              : change?.negative?.absoluteValue?.gt(10)
              ? "--"
              : changePct?.nonZeroish(2)?.prettify(),
            pendingColor: change?.positive ? "success" : "danger",
            infoIcon: (
              <InfoIcon
                tooltip={
                  <Card variant="tooltip" sx={{ width: "220px" }}>
                    The ratio between the dollar value of the collateral and the
                    debt (in LUSD) you are depositing. While the Minimum
                    Collateral Ratio is 110% during normal operation, it is
                    recommended to keep the Collateral Ratio always above 150%
                    to avoid liquidation under Recovery Mode. A Collateral Ratio
                    above 200% or 250% is recommended for additional safety.
                  </Card>
                }
              />
            ),
          },
          <Box sx={{ fontSize: "34px" }}>
            <Icon name="heartbeat" />
          </Box>,
          {
            title: "Liquidation price",
            inputId: "trove-liqidation-price",
            amount: `${liquidationPrice} $`,
            color,
            pendingColor: change?.positive ? "success" : "danger",
            infoIcon: (
              <InfoIcon
                tooltip={
                  <Card variant="tooltip" sx={{ width: "220px" }}>
                    ETH price below which a Trove can be liquidated in normal
                    mode.
                  </Card>
                }
              />
            ),
          },
        ]}
      />
      {value?.lt(1.5) && (
        <ActionDescription>
          Keeping your CR above 150% can help avoid liquidation under Recovery
          Mode.
        </ActionDescription>
      )}
    </>
  ) : null;
};
