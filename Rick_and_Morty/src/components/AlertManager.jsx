import Swal from 'sweetalert2';

export const showNoCharactersFoundAlert = () => {
    Swal.fire('No characters found', '', 'warning');
};

export const showErrorFetchingCharactersAlert = () => {
    Swal.fire('Error fetching characters', '', 'error');
};

export const showCharacterAlreadyInFavoritesAlert = () => {
    Swal.fire('Character already in favorites', '', 'info');
};

export const showFavoriteCharacterSavedAlert = (character) => {
    Swal.fire({
        title: 'Favorite Character Saved!',
        text: `${character.name} has been saved as your favorite character.`,
        imageUrl: character.image,
        imageWidth: 200,
        imageHeight: 200,
    });
};

export const showFavoriteCharacterRemovedAlert = (character) => {
    Swal.fire({
        title: 'Favorite Character Removed!',
        text: `${character.name} has been removed from your favorite characters.`,
        imageUrl: character.image,
        imageWidth: 200,
        imageHeight: 200,
    });
};
