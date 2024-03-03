import React, {useEffect, useState} from 'react'
import "./Nav.css"

export default function Nav() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
              setShow(true);
            } else {
              setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img
        alt="User logged"
        src="https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
        className="nav__avatar"
      />
    </nav>
  );
}
