import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './component/search/SearchBar';

const CardList = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingId, setEditingId] = useState('');

  // useEffect(() => {
  //   const storedCards = localStorage.getItem('cards');
  //   if (storedCards) {
  //     setCards(JSON.parse(storedCards));
  //   }
  // }, []);
  const handleSearch = (value) => {
    console.log('Search value:', value);
  };
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

  return (
    <div className='main_section'>
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
      {/* <pre>{JSON.stringify(cards, null, 4)}</pre> */}
      <div className='card_main_block'>
        {cards.map((card) => (
          <div className='card_design' key={card.id}>
            {card.content}
            <div className='btn_block'>
              <button onClick={() => handleEditCard(card.id)}>Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <SearchBar placeholder='Search...' onChange={handleSearch} />
      </div>
    </div>
  );
};

export default CardList;
