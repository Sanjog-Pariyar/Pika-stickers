/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Pokemon = ({ name, url }) => {

    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            const data = await res.json()
            setImage(data.sprites.other.dream_world.front_default)
        }
        fetchData()
    }, [url])

    const pokename = name.charAt(0).toUpperCase() + name.slice(1)

    return(
        <section className="pokemon-section">
            <Link className="link" to={`/pokemon/${name}`}>
                <div className="single-pokemon">
                    <img 
                        src={image} 
                        alt="pokemon"
                        width={160}
                        height={160}
                    />
                    <p className="pokemon-name">{pokename}</p>
                </div>
            </Link>
        </section>
    )
}

export default Pokemon