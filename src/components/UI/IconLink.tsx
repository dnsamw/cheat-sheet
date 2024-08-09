import { Link } from "react-router-dom";
import "../../assets/scss/auth-link.scss";

type Props = {
  routePath: string;
  children: React.ReactNode;
  color: string;
  text?: string;
};

function IconLink({ routePath, color, children,text }: Props) {
  return (
    <>
      <Link
        className="icon-link"
        style={{ color: color}}
        to={routePath}
      >
        {children}&nbsp; &nbsp;{text}
      </Link>
    </>
  );
}

export default IconLink;
