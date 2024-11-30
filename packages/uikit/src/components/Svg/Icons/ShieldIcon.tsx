import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

export const ShieldIcon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <mask id="ShieldIcon" height="24" maskUnits="userSpaceOnUse" width="24" x="0" y="0">
      <path d="m0 0h24v24h-24z" fill="#d9d9d9" />
    </mask>
    <g mask="url(#ShieldIcon)">
      <path
        d="m9.2 15.6 2.8-2.1 2.75 2.1-1.05-3.4 2.8-2.2h-3.4l-1.1-3.4-1.1 3.4h-3.4l2.75 2.2zm2.8 6.4c-2.31667-.5833-4.22917-1.9125-5.7375-3.9875s-2.2625-4.3792-2.2625-6.9125v-6.1l8-3 8 3v6.1c0 2.5333-.7542 4.8375-2.2625 6.9125s-3.4208 3.4042-5.7375 3.9875zm0-2.1c1.7333-.55 3.1667-1.65 4.3-3.3s1.7-3.4833 1.7-5.5v-4.725l-6-2.25-6 2.25v4.725c0 2.0167.56667 3.85 1.7 5.5s2.5667 2.75 4.3 3.3z"
        fill="currentColor"
      />
    </g>
  </Svg>
);
