import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    // const updatedCards = cards.filter((card) => card.id !== id);
    // setCards(updatedCards);
    // localStorage.setItem('cards', JSON.stringify(updatedCards));
    // const values = localStorage.getItem('cards').JSON.parse();
    // console.log('values', values);
    // const result = values.filter((item) => item.id === id);
    // localStorage.removeItem(result.id);
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

  // const handleDeleteCard = (id) => {
  //   setCards((prevCards) => {
  //     const updatedCards = [...prevCards];
  //     const index = updatedCards.findIndex((card) => card.id === id);
  //     if (index !== -1) {
  //       updatedCards.splice(index, 1);
  //       localStorage.setItem('cards', JSON.stringify(updatedCards));
  //     }

  //     return updatedCards;
  //   });
  // };
  // const handleUpdateCard = () => {
  //   if (inputValue.trim() !== '') {
  //     setCards((prevCards) => {
  //       const updatedCards = [...prevCards];
  //       const index = updatedCards.findIndex((card) => card.id === editingId);
  //       if (index !== -1) {
  //         updatedCards[index].content = inputValue;
  //       }
  //       return updatedCards;
  //     });
  //     setInputValue('');
  //     setEditingId('');
  //   }
  // };

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
              <button onClick={() => handleToggleFavorite(card.id)}>
                {card.favorite ? 'Remove Favorite' : 'Add Favorite'}
              </button>
            </div>
          </div>
        ))}
        <Link to='/favorites' className='favorite_button'>
          View Favorites
        </Link>
      </div>
    </div>
  );
};

export default CardList;
