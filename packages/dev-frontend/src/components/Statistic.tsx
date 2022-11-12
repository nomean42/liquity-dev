import React from "react";
import { Flex, Card } from "theme-ui";
import { InfoIcon } from "./InfoIcon";
import { Units } from "../strings";

type StatisticProps = {
  name: Units | string | React.ReactNode;
  tooltip?: React.ReactNode;
};

export const Statistic: React.FC<StatisticProps> = ({
  name,
  tooltip,
  children,
}) => {
  return (
    <Flex sx={{ borderBottom: 1, borderColor: "infoBorder" }}>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1.2,
          fontWeight: 200,
        }}
      >
        <Flex>{name}</Flex>
        {tooltip && (
          <InfoIcon
            size="xs"
            tooltip={<Card variant="tooltip">{tooltip}</Card>}
          />
        )}
      </Flex>
      <Flex
        sx={{ justifyContent: "flex-start", flex: 0.8, alignItems: "center" }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
