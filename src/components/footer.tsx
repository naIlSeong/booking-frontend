import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer: React.FC = () => {
  return (
    <footer className="py-7 bg-coolGray-900 relative bottom-0 left-0">
      <div className="w-full px-9 max-w-screen-2xl mx-auto flex flex-col items-center ">
        <span className="text-coolGray-300 mb-2">Developer</span>
        <span className="text-white mb-9 font-semibold text-lg">나일성</span>
        <a
          className="footerLink"
          target="_blank"
          rel="noreferrer"
          href="http://github.com/nailseong"
        >
          <FontAwesomeIcon icon={faGithub} className="text-5xl" />
        </a>
        <div className="mb-2">
          <span className="text-coolGray-300 font-semibold">
            Backend Repository{" "}
          </span>
          <a
            className="footerLink"
            target="_blank"
            rel="noreferrer"
            href="http://github.com/nailseong/booking-api"
          >
            {" "}
            @Github &rarr;
          </a>
        </div>
        <a
          className="footerLink"
          target="_blank"
          rel="noreferrer"
          href="mailto:ilseongdev@gmail.com"
        >
          <span>ilseongdev@gmail.com</span>
        </a>
      </div>
    </footer>
  );
};
