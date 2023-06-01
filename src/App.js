import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardList from './CardList';
import FavoriteList from './FavoriteList';
import FormInput from './FormInput';

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);
      setCards(parsedCards);
      const filteredFavorites = parsedCards.filter((card) => card.favorite);
      setFavoriteCards(filteredFavorites);
    }
  }, []);

  const handleToggleFavorite = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            favorite: !card.favorite,
          };
        }
        return card;
      });
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      const filteredFavorites = updatedCards.filter((card) => card.favorite);
      setFavoriteCards(filteredFavorites);
      return updatedCards;
    });
  };

  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <CardList
                  cards={cards}
                  setCards={setCards}
                  toggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              exact
              path='/favorites'
              element={<FavoriteList favoriteCards={favoriteCards} />}
            />
            <Route path='/inputform' element={<FormInput />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
