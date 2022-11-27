import { Decimal } from "@liquity/lib-base";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useBondView } from "./Bonds/context/BondViewContext";

const labels = ["Pending", "Reserve", "Permanent"];
const colors = ["#7a77c2", "#6d6aad", "#5f5c97"];
const RADIAN = Math.PI / 180;

export const TreasuryChart = () => {
  const { protocolInfo } = useBondView();

  if (protocolInfo === undefined) return null;

  const treasuryChartData = [];

  const buckets = [
    parseFloat(protocolInfo.treasury.pending.toString()),
    parseFloat(protocolInfo.treasury.reserve.toString()),
    parseFloat(protocolInfo.treasury.permanent.toString())
  ];

  if (protocolInfo.treasury.pending !== Decimal.ZERO) {
    treasuryChartData.push({
      name: "Pending",
      value: buckets[0]
    });
  }

  if (protocolInfo.treasury.reserve !== Decimal.ZERO) {
    treasuryChartData.push({
      name: "Reserve",
      value: buckets[1]
    });
  }

  if (protocolInfo.treasury.permanent !== Decimal.ZERO) {
    treasuryChartData.push({
      name: "Permanent",
      value: buckets[2]
    });
  }

  return null;
};
