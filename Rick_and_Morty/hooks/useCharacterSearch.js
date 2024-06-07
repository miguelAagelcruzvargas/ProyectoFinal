import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import _ from "lodash";
import { getCharacters } from "../src/api/RickAndMortyApi.js";

export const useCharacterSearch = (initialSearch = "") => {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState(initialSearch);

  const debouncedSearch = useCallback(
    _.debounce((search) => {
      getCharacters(search)
        .then((data) => {
          if (data) {
            setCharacters(data);
          } else {
            setCharacters([]);
            Swal.fire("No characters found", "", "warning");
          }
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
          Swal.fire("Error fetching characters", "", "error");
        });
    }, 500),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setCharacters([]);
    }
  }, [query, debouncedSearch]);

  return { characters, query, setQuery };
};
