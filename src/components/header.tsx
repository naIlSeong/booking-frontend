import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="py-5 bg-coolGray-800">
      <div className="w-full px-9 max-w-screen-2xl mx-auto flex justify-between">
        <Link to="/">
          <span className="title text-3xl font-medium tracking-wider pb-0">
            BOOKING
          </span>
        </Link>
        <Link to="/my-profile">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="title text-4xl pb-0"
          />
        </Link>
      </div>
    </header>
  );
};
