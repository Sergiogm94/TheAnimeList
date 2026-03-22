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
        <Route path="/animes" element={<PaginaAnime></PaginaAnime>}/>
        <Route path="/personajes" element={<PaginaPersonajes></PaginaPersonajes>}/>
        <Route path="/login" element={<LoginRegistro></LoginRegistro>}/>
      </Routes>
    </Router>
  )
}

export default App
