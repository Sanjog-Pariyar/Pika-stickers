import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PokemonInfo = () => {

    const [pokemon, setPokemon] = useState({})
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const { name } = useParams()

    const singlePokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}`

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(singlePokemonURL);
                const data = await res.json();
                setPokemon(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [singlePokemonURL])

    const image = pokemon.sprites?.other?.dream_world?.front_default || '';

    const stats = pokemon.stats || []

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something went wrong! Please try again</div>
    }

  return (
    <div className="main-sticker">
        <img 
            src={image} 
            alt={name} 
            width={300}
            height={300}/>
        <h1 className="pokemon-name-big"># {pokemon.species?.name}</h1>
        <div className="main-stats">
        { stats.map((stat) => (
            <div className="stats" key={stat.stat.name}>
                    <p>{stat.stat.name}: {stat.base_stat}</p>
                </div>
            ))}
        </div>
        <Link className="back-btn" to={'/'}>Back</Link>
    </div>
  )
}

export default PokemonInfo