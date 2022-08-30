import { useEffect, useState } from 'react';
import friendsData from '../data/friends-quotes.json';
import callToApi from '../services/api';
import '../styles/App.css';


function App() {

  const [quotes, setQuotes] = useState(friendsData);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: ''
  })
  const [searchQuote, setSearchQuote] = useState ('');
  const [searchCharacter, setSearchCharacter] = useState ('all');


  let html;
 
  if (searchCharacter === 'all') {
  html = quotes
  .filter((quote) => {
  return quote.quote.toLowerCase().includes(searchQuote.toLowerCase())
  })
  .map((quote, index) => {
    return (<li key={index} className='list-item'>
      {quote.quote} - {quote.character}
    </li>)
  })
} else {
  html = quotes
  .filter((quote) => {
  return searchCharacter === quote.character;
  })
  .filter((quote) => {
  return quote.quote.toLowerCase().includes(searchQuote.toLowerCase())
  })
  .map((quote, index) => {
    return (<li key={index} className='list-item'>
      {quote.quote} - {quote.character}
    </li>)
  })
}

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
      <h1 title='Frases de Friends' className='title'>frases de friends</h1>
      <form className='filter-form'>
        <label htmlFor='quote-filter'>Filtrar por frase</label>
        <input 
          type='text' 
          id='quote-filter'
          value={searchQuote}
          onChange={handleSearchQuote}>
        </input>
        <label htmlFor='char-filter'>Filtrar por personaje</label>
        <select className='select' name='char-filter' id='char-filter' onChange={handleSearchCharacter} value={searchCharacter}>
          <option value='all' selected>Todos</option>
          <option value='Ross'>Ross</option>
          <option value='Monica'>Monica</option>
          <option value='Joey'>Joey</option>
          <option value='Phoebe'>Phoebe</option>
          <option value='Chandler'>Chandler</option>
          <option value='Rachel'>Rachel</option>
        </select>
      </form>
      <ul className='list'>
        {html}
      </ul>

      <form className='add-form'>
        <h3>Añadir una nueva frase</h3>
        <div className='quote-block'>
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
        </div>
        <button className='add-btn' onClick={handleAddQuote}>Añadir nueva frase</button>
      </form>
    </div>
  );
}

export default App;
