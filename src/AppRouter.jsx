// En este componente se hace la isntancia de ruteo a todas las demas paginas que se mostran en la pagina
import { Navigate, Route, Routes } from 'react-router-dom'
//Components
import Header from './Components/Header'
//Pages
import HomePage from './Pages/HomePage'
import PokeFiltered from './Pages/PokeFiltered'
import PokePage from './Pages/PokePage'
import { PokeRange } from './Pages/PokeRange'

import SearchPage from './Pages/SearchPage'

export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Header/>}>
            <Route index element={<HomePage/>}/>
            <Route path='pokemon/:id' element={<PokePage/>}/>
            <Route path='search' element={<SearchPage/>}/>
            <Route path='pokeClass' element={<PokeFiltered/>}/>
            <Route path='pokeRange' element={<PokeRange/>}/>
        </Route>
        {/* cuando no encuentre */}
        <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}
