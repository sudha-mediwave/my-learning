import React, { useState, useEffect } from 'react';
import './App.css';
import Searchicon from './Searchicon';

const CardList = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const setLocalStorage = (card) => {
    let existingCards = localStorage.getItem('cards');
    if (existingCards) {
      const existArray = JSON.parse(existingCards) || [];
      existArray.push(card);
      localStorage.setItem('cards', JSON.stringify(existArray));
    } else {
      console.log('Else calledd.');
      localStorage.setItem('cards', JSON.stringify([card]));
    }
  };

  const generateId = () => {
    return '_' + Math.floor(1000 + Math.random() * 9000);
  };

  const handleAddCard = () => {
    if (inputValue.trim() !== '') {
      const newCard = {
        id: generateId(),
        content: inputValue,
      };
      setCards((prevCards) => [...prevCards, newCard]);
      setLocalStorage(newCard);
      setInputValue('');
    }
  };

  const handleEditCard = (id) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
      setEditingId(id);
      setInputValue(cards[index].content);
    }
  };

  const handleUpdateCard = () => {
    if (inputValue.trim() !== '') {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        const index = updatedCards.findIndex((card) => card.id === editingId);
        if (index !== -1) {
          updatedCards[index].content = inputValue;
        }
        return updatedCards;
      });
      setInputValue('');
      setEditingId('');
    }
  };

  const handleDeleteCard = (id) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const index = updatedCards.findIndex((card) => card.id === id);
      if (index !== -1) {
        updatedCards.splice(index, 1);
      }

      return updatedCards;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const filteredCards = searchQuery
    ? cards.filter((card) =>
        card.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cards;

  return (
    <div className='main_section'>
      <div className='main_block'>
        <div className='input_main_block'>
          <input
            className='input_section'
            type='text'
            value={inputValue}
            onChange={handleInputChange}
          />
          {editingId === '' ? (
            <button className='main_button' onClick={handleAddCard}>
              Add
            </button>
          ) : (
            <button className='main_button' onClick={handleUpdateCard}>
              Update
            </button>
          )}
        </div>
        <div className='search_main_block'>
          <form onSubmit={handleSearch} className='search_bar'>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='Search...'
              className='input_section'
            />
            <button type='submit' className='search_button'>
              <Searchicon />
            </button>
          </form>
        </div>
      </div>
      {/* <pre>{JSON.stringify(cards, null, 4)}</pre> */}
      <div className='card_main_block'>
        {filteredCards.map((card, index) => (
          <div
            className='card_design'
            key={card.id}
            style={{
              backgroundColor: index % 2 === 0 ? '#00c9ff' : '#92fe9d',
            }}
          >
            {card.content}
            <div className='btn_block'>
              <button onClick={() => handleEditCard(card.id)}>Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
