import React from 'react';
import './App.css';
const FavoriteList = ({ favoriteCards }) => {
  if (!favoriteCards || !Array.isArray(favoriteCards)) {
    return <div>No favorite cards available.</div>;
  }
  return (
    <div className='fav_block'>
      <h2>Favorite Cards</h2>
      <div className='card_main_block'>
        {favoriteCards.map((card) => (
          <div className='card_design' key={card.id}>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
