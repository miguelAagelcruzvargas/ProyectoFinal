import { useState, useCallback } from "react";
import { getCharacters } from "../src/api/RickAndMortyApi";
import Swal from "sweetalert2";
import _ from "lodash";

export const useCharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useCallback(
    _.debounce((search, status, species, type, gender, page) => {
      setIsLoading(true);
      return getCharacters(search, status, species, type, gender, page)
        .then((data) => {
          if (data.results) {
            setCharacters(data.results);
            setTotalPages(data.info.pages);
          } else {
            setCharacters([]);
            Swal.fire("No characters found", "", "info");
          }
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
          Swal.fire("Error fetching characters", "", "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500),
    []
  );

  const handleSearch = () => {
    debouncedSearch(query, statusFilter, speciesFilter, typeFilter, genderFilter, page);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    debouncedSearch(query, statusFilter, speciesFilter, typeFilter, genderFilter, newPage);
  };

  const clearResults = () => {
    setCharacters([]);
    setQuery("");
    setStatusFilter("all");
    setSpeciesFilter("all");
    setTypeFilter("all");
    setGenderFilter("all");
    setPage(1);
  };

  return {
    characters,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    speciesFilter,
    setSpeciesFilter,
    typeFilter,
    setTypeFilter,
    genderFilter,
    setGenderFilter,
    handleSearch,
    handlePageChange,
    clearResults,
    isLoading,
    page,
    totalPages,
  };
};
