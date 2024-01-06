/* eslint-disable react-refresh/only-export-components */
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Inputs from './components/Inputs'
import Pokemon from './components/Pokemon'
import PokemonInfo from './components/PokemonInfo'
import store from './store/store'


const baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'


const App = () => {

    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const res = await fetch(baseURL)
                const data = await res.json()
                store.setPokemon(data.results)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const userSearch = store.filter

    const filterResults =  store.pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(userSearch.toLowerCase()))

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something went wrong! Please try again</div>
    }


  return (
        <Router>
            <div className='app-container'>
            <Routes>
                <Route 
                    path='/'
                    element={
                        <>
                            <h1 className='sticker-font'>Pika stickers</h1>
                            <Inputs />
                                <div className='pokemon-container'>
                                    {filterResults.map((pokemon) => (
                                        <Pokemon
                                            key={pokemon.name}
                                            name={pokemon.name}
                                            url={pokemon.url}
                                        />))}
                                </div>
                        </>}/>
                    <Route 
                        path='/pokemon/:name'
                        element={
                            <PokemonInfo />
                        }
                    />
            </Routes>
            </div>
        </Router>
  )
}

export default observer(App)
