import { NavLink } from "react-router-dom";


export default function HeaderRotas(){
    return(
        <>
            <li><NavLink className={"header__nav-padding"} to="/" title="Desafio 1" >Desafio 1</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/desafio-2" title="Desafio 2" >Desafio 2</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/desafio-3" title="Desafio 3">Desafio 3</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/desafio-4" title="Desafio 4">Desafio 4</NavLink></li>
        </>
    )
}