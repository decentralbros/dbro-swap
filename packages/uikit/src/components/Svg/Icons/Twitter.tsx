import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg {...props} viewBox="0 0 20 20">
      <path d="M 11.90625 8.476562 L 19.351562 0 L 17.585938 0 L 11.117188 7.359375 L 5.957031 0 L 0 0 L 7.808594 11.128906 L 0 20.015625 L 1.765625 20.015625 L 8.589844 12.242188 L 14.042969 20.015625 L 20 20.015625 M 2.402344 1.300781 L 5.109375 1.300781 L 17.585938 18.777344 L 14.875 18.777344 " />
    </Svg>
  );
};

export default Icon;
