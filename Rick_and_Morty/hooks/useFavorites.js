// useFavorites.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const useFavorites = (initialFavorites = []) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCharacters")) || initialFavorites
  );

  useEffect(() => {
    localStorage.setItem("favoriteCharacters", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      Swal.fire("Character already in favorites", "", "info");
      return;
    }
    const newFavorites = [...favorites, character];
    setFavorites(newFavorites);
    Swal.fire({
      title: "Favorite Character Saved!",
      text: `${character.name} has been saved as your favorite character.`,
      imageUrl: character.image,
      imageWidth: 200,
      imageHeight: 200,
    });
  };

  const removeFavorite = (character) => {
    const newFavorites = favorites.filter((fav) => fav.id !== character.id);
    setFavorites(newFavorites);
    Swal.fire({
      title: "Favorite Character Removed!",
      text: `${character.name} has been removed from your favorite characters.`,
      imageUrl: character.image,
      imageWidth: 200,
      imageHeight: 200,
    });
  };

  return { favorites, addFavorite, removeFavorite };
};
