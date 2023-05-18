import React, { useState } from 'react';
import './App.css';

const CardList = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingId, setEditingId] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
    <div>
      <input type='text' value={inputValue} onChange={handleInputChange} />
      {editingId === '' ? (
        <button onClick={handleAddCard}>Add</button>
      ) : (
        <button onClick={handleUpdateCard}>Update</button>
      )}
      <pre>{JSON.stringify(cards, null, 4)}</pre>
      <ul>
        {cards.map((card) => (
          <div className='card_design' key={card.id}>
            <li>
              {card.content}
              <button onClick={() => handleEditCard(card.id)}>Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
