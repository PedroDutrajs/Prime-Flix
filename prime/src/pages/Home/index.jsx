import { useState, useEffect } from "react"
import api from "../../services/api"
import {Link} from 'react-router-dom'
import './home.css'
//URL DA API: /movie/now_playing?api_key=f79d0e737ce4b77beb497f931e34ad5f&language=pt-BR

const Home = () => {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get('movie/now_playing', {
        params:{
          api_key: 'f79d0e737ce4b77beb497f931e34ad5f',
          language: 'pt-BR',
          page: 1
        }
      })
      //console.log(response.data.results)
      setFilmes(response.data.results.slice(0, 10))
      setLoading(false)
    }
    loadFilmes()
  }, [])

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }
  return (
    <div className="container">
        <div className="lista-filmes">
          {filmes.map((filme) => {
            return(
              <article key={filme.id}>
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            )
          })}
        </div>
    </div>
  )
}

export default Home