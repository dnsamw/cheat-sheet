import { Link } from "react-router-dom";

import "../../assets/scss/auth-link.scss";
import { Config } from "../../config/appConfig";
type Props = {
  routePath: string;
  children: React.ReactNode;
  color: string;
};

function IconLink({ routePath, color, children }: Props) {
  return (
    <>
      <Link
        className="icon-link"
        style={{ color: color, backgroundColor: Config.colors.getBg(color) }}
        to={routePath}
      >
        {children}
      </Link>
    </>
  );
}

export default IconLink;
