import './App.css'
import Home from './Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginRegistro from './Pages/Login/LoginRegistro'
import PaginaAnime from './Pages/PaginaAnime/PaginaAnime'
import PaginaPersonajes from './Pages/PaginaPersonajes/PaginaPersonajes'
import Registro from './Components/Registro/Registro'
import Login from './Components/Login/Login'
import Animes from './Pages/Animes/Animes'
import Perfil from './Pages/Perfil/Perfil'
import Foro from './Pages/Foro/Foro'
import BotonTop from './Components/BotonTop/BotonTop'


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/anime" element={<PaginaAnime></PaginaAnime>}/>
        <Route path="animes" element={<Animes></Animes>}/>
        <Route path="/personajes" element={<PaginaPersonajes></PaginaPersonajes>}/>
        <Route path="/loginreg" element={<LoginRegistro></LoginRegistro>}/>
        <Route path="/reg" element={<Registro></Registro>}/>
        <Route path="foro" element={<Foro></Foro>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/perfil" element={<Perfil></Perfil>}/>
      </Routes>
    </Router>
    <BotonTop></BotonTop>
    </div>
  )
}

export default App
