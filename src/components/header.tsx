import { useReactiveVar } from "@apollo/client";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";

export const Header: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <header className="py-5 bg-coolGray-800 fixed w-screen top-0 left-0">
      <div className="w-full px-9 max-w-screen-2xl mx-auto flex justify-between items-center">
        {isLoggedIn ? (
          <>
            <div className="w-2/12">
              <Link to="/">
                <span className="title text-3xl font-medium tracking-wider pb-0">
                  BOOKING
                </span>
              </Link>
            </div>
            <div className="flex justify-evenly w-full text-center ">
              <Link to="/create-in-use">
                <span className="title text-xl font-medium tracking-wider pb-0">
                  Create In Use
                </span>
              </Link>
              <Link to="/create-booking">
                <span className="title text-xl font-medium tracking-wider pb-0">
                  Create Booking
                </span>
              </Link>
              <Link to="/teams">
                <span className="title text-xl font-medium tracking-wider pb-0">
                  Teams
                </span>
              </Link>
              <Link to="/places">
                <span className="title text-xl font-medium tracking-wider pb-0">
                  Places
                </span>
              </Link>
            </div>
            <div className="w-2/12 text-right">
              <Link to="/my-profile">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="title text-4xl pb-0"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="w-2/12">
            <Link to="/">
              <span className="title text-3xl font-medium tracking-wider pb-0">
                BOOKING
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
