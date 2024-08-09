import React from "react";
import { Config } from "../../config/appConfig";
import '../..//assets/scss/icon-button.scss';
type Props = {
  color: string;
  onPress: () => void;
  children: React.ReactNode;
  text?: string;
};

function IconButton({ color, onPress, children,text }: Props) {
  return (
    <button
    className="icon-button"
      onClick={onPress}
      style={{ color: color}}
    >
      {text} {children}
    </button>
  );
}

export default IconButton;
 