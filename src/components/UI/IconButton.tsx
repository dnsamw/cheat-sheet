import React from "react";
import { Config } from "../../config/appConfig";
import '../..//assets/scss/icon-button.scss';
type Props = {
  color: string;
  onPress: () => void;
  children: React.ReactNode;
};

function IconButton({ color, onPress, children }: Props) {
  return (
    <button
    className="icon-button"
      onClick={onPress}
      style={{ color: color, backgroundColor: Config.colors.getBg(color) }}
    >
      {children}
    </button>
  );
}

export default IconButton;
