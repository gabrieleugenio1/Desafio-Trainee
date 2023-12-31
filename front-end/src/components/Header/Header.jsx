import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import MenuMobile from "../MenuMobile/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import HeaderRotas from "./HeaderRotas";

export default function Header() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <>
      <MenuMobile
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />

      <header className="header">
        <NavLink className={"header__logo"} to="/" title="Home">
          <h2>Desafio KUKAC</h2>
        </NavLink>
        <div>
          <section className="header__menu">
            <nav className="nav">
              <ul>
                <HeaderRotas />
              </ul>
            </nav>
          </section>
          <section className="header__mobile">
            <FontAwesomeIcon
              icon={faBars}
              size="xl"
              onClick={() => setMenuIsVisible(true)}
            />
          </section>
        </div>
      </header>
    </>
  );
}
