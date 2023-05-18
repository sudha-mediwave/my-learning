import React, { useState } from 'react';
import './App.css';
const CardList = () => {
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddCard = () => {
    if (inputValue.trim() !== '') {
      setCards((prevCards) => [...prevCards, inputValue]);
      setInputValue('');
    }
  };

  const handleEditCard = (index) => {
    setEditingIndex(index);
    setInputValue(cards[index]);
  };

  const handleUpdateCard = () => {
    if (inputValue.trim() !== '') {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[editingIndex] = inputValue;
        return updatedCards;
      });
      setInputValue('');
      setEditingIndex(-1);
    }
  };

  const handleDeleteCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  return (
    <div>
      <input type='text' value={inputValue} onChange={handleInputChange} />
      {editingIndex === -1 ? (
        <button onClick={handleAddCard}>Add</button>
      ) : (
        <button onClick={handleUpdateCard}>Update</button>
      )}
      <ul>
        {cards.map((card, index) => (
          <div className='card_design'>
            <li key={index}>
              {card}
              <button onClick={() => handleEditCard(index)}>Edit</button>
              <button onClick={() => handleDeleteCard(index)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
