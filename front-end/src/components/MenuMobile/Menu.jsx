import { Container } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import HeaderRotas from "../Header/HeaderRotas";

export default function MenuMobile({ menuIsVisible, setMenuIsVisible }) {
  useEffect(() => {
    document.body.style.overflow = menuIsVisible ? "hidden" : "auto";
  }, [menuIsVisible]);

  return (
    <Container isVisible={menuIsVisible}>
      <FontAwesomeIcon
        icon={faXmark}
        size="xl"
        onClick={() => setMenuIsVisible(false)}
      />
      <nav>
        <ul className="nav_mobile-list">
          <HeaderRotas />
        </ul>
      </nav>
    </Container>
  );
}
