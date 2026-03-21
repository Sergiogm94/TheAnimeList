import './App.css'
import Home from './Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginRegistro from './Pages/Login/LoginRegistro'
import PaginaAnime from './Pages/PaginaAnime/PaginaAnime'
import PaginaPersonajes from './Pages/PaginaPersonajes/PaginaPersonajes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/login/registro" element={<LoginRegistro></LoginRegistro>}/>
        <Route path="/animes" element={<PaginaAnime></PaginaAnime>}/>
        <Route path="/personajes" element={<PaginaPersonajes></PaginaPersonajes>}/>
      </Routes>
    </Router>
  )
}

export default App
