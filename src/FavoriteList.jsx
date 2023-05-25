import React from 'react';

const FavoriteList = ({ favoriteCards }) => {
  if (!favoriteCards || !Array.isArray(favoriteCards)) {
    return <div>No favorite cards available.</div>;
  }
  return (
    <div>
      <h2>Favorite Cards</h2>
      {favoriteCards.map((card) => (
        <div key={card.id}>{card.content}</div>
      ))}
    </div>
  );
};

export default FavoriteList;
