import { useState } from 'react';
import friendsData from '../data/friends-quotes.json';
import '../styles/App.css';



function App() {

  const [quotes, setQuotes] = useState(friendsData);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: ''
  })
  const [searchQuote, setSearchQuote] = useState ('');
  const [searchCharacter, setSearchCharacter] = useState ('Todos');

  const html = quotes
  .filter((quote) => {
  return quote.quote.toLowerCase().includes(searchQuote.toLowerCase()) 
  || quote.character === searchCharacter;
  })
  .map((quote, index) => {
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

  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.currentTarget.value);
  }

  const handleSearchCharacter = (ev) => {
    setSearchCharacter(ev.currentTarget.value);
  }

  return (
    <div>
      <h1>Frases de Friends</h1>
      <form>
        <label htmlFor='quote-filter'>Filtrar por frase</label>
        <input 
          type='text' 
          id='quote-filter'
          value={searchQuote}
          onChange={handleSearchQuote}>
        </input>
        <label htmlFor='char-filter'>Filtrar por personaje</label>
        <select name='char-filter' id='char-filter' onChange={handleSearchCharacter}>
          <option selected>Todos</option>
          <option>Ross</option>
          <option>Monica</option>
          <option>Joey</option>
          <option>Phoebe</option>
          <option>Chandler</option>
          <option>Rachel</option>
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
