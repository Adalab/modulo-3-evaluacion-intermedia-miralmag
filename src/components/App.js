import { useState } from 'react';
import friendsData from '../data/friends-quotes.json';
import '../styles/App.css';



function App() {

  const [quotes, setQuotes] = useState(friendsData);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: ''
  })

  const html = quotes.map((quote, index) => {
    return (<li key={index}>
      {quote.quote} - {quote.character}
    </li>)
  })

  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote, [ev.target.id]: ev.target.value
    });
  }

  const handleAddQuote = (ev) => {
    ev.preventDefault();
    setQuotes([
      ...quotes, newQuote
    ])
    setNewQuote({
      quote: '',
      character: ''
    })
  }


  return (
    <div>
      <h1>Frases de Friends</h1>
      <form>
        <label htmlFor='quote-filter'>Filtrar por frase</label>
        <input type='text' id='quote-filter'></input>
        <label htmlFor='char-filter'>Filtrar por personaje</label>
        <select id='char-filter'>
          <option value='todos' selected>Todos</option>
          <option value='ross'>Ross</option>
          <option value='monica'>Monica</option>
          <option value='joey'>Joey</option>
          <option value='phoebe'>Phoebe</option>
          <option value='chandler'>Chandler</option>
          <option value='rachel'>Rachel</option>
        </select>
      </form>
      <ul>
        {html}
      </ul>

      <form>
        <h3>Añadir una nueva frase</h3>
        <label htmlFor='add-quote'>Frase</label>
        <input 
          type='text' 
          id='quote' 
          value={newQuote.quote} 
          onChange={handleNewQuote}>
        </input>
        <label htmlFor='add-character'>Personaje</label>
        <input 
          type='text' 
          id='character' 
          value={newQuote.character} 
          onChange={handleNewQuote}>
        </input>
        <button onClick={handleAddQuote}>Añadir nueva frase</button>
      </form>
    </div>
  );
}

export default App;
