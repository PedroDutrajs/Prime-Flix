
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import './filme-info.css'
import {toast} from 'react-toastify' 

const Filme = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    async function loadFilme() {
       await api.get(`/movie/${id}`, {
        params:{
          api_key: 'f79d0e737ce4b77beb497f931e34ad5f',
          language: 'pt-BR'
        }
       })
       .then((response) => {
          setFilme(response.data)
          setLoading(false)
       })
       .catch(() => {
        console.log('Filme não encontrado')
        navigate('/', {replace: true})
        return
       })
    }
    loadFilme()

    return() =>{
      console.log('componente desmontado')
    }
  }, [navigate, id])

  if(loading){
    <div className='filme-info'>
      <h1>Carregando detalhes...</h1>
    </div>
  }
  const salvarFilme = () => {
    const minhaLista = localStorage.getItem('@primeflix')
    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilme){
      toast.warning('Esse filme já foi salvo')
      return
    }
    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!')
  }
  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average}/10</strong>
        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title}`}>Trailer</a>
          </button>
        </div>

    </div>
  )
}

export default Filme