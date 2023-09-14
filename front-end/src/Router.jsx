import {Route, Routes } from "react-router-dom";

//Páginas
import Index from './pages/Index';
import DesafioDois from "./pages/desafio-2/desafio-2";
import DesafioTres from "./pages/desafio-3/desafio-3";
import DesafioQuatro from "./pages/desafio-4/desafio-4";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/desafio-2" element={ <DesafioDois /> } />
            <Route path="/desafio-3" element={ <DesafioTres /> } />
            <Route path="/desafio-4" element={ <DesafioQuatro /> } />
        </Routes>
    )
}
