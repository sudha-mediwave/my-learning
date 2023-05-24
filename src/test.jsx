import React, { useState, useEffect } from 'react';
import './App.css';
import Searchicon from './Searchicon';

const CardList = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

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
        favorite: false,
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

  const handleDeleteCard = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const handleUpdateCard = () => {
    if (inputValue.trim() !== '') {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        const index = updatedCards.findIndex((card) => card.id === editingId);
        if (index !== -1) {
          updatedCards[index].content = inputValue;
          localStorage.setItem('cards', JSON.stringify(updatedCards));
        }
        return updatedCards;
      });
      setInputValue('');
      setEditingId('');
    }
  };

  const handleToggleFavorite = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            favorite: !card.favorite, // Toggle the favorite property
          };
        }
        return card;
      });
      localStorage.setItem('cards', JSON.stringify(updatedCards));
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

  const favoriteCards = filteredCards.filter((card) => card.favorite);

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleBackToMain = () => {
    setShowFavorites(false);
  };

  if (showFavorites) {
    return (
      <div className='favorite-cards-page'>
        <h2>Favorite Cards</h2>
        <button onClick={handleBackToMain}>Back to Main</button>
        {favoriteCards.map((card) => (
          <div className='favorite-card' key={card.id}>
            {card.content}
          </div>
        ))}
      </div>
    );
  }

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
              <button onClick={() => handleToggleFavorite(card.id)}>
                {card.favorite ? 'Remove Favorite' : 'Add Favorite'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {favoriteCards.length > 0 && (
        <button className='fav_btn' onClick={handleShowFavorites}>
          Show Favorite Cards
        </button>
      )}
    </div>
  );
};

export default CardList;
