import React from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import { Icon } from "./Icon";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type InfoIconProps = Pick<TippyProps, "placement"> &
  Pick<FontAwesomeIconProps, "size"> &
  Partial<Pick<TippyProps, "maxWidth">> &
  {
    tooltip: React.ReactNode;
  };

export const InfoIcon: React.FC<InfoIconProps> = ({ placement = "right", tooltip, size = "1x" , maxWidth = "364px"}) => {
  return (
    <Tippy interactive={true} placement={placement} content={tooltip} maxWidth={maxWidth}>
      <span>
        &nbsp;
        <Icon name="question-circle" size={size} />
      </span>
    </Tippy>
  );
};
