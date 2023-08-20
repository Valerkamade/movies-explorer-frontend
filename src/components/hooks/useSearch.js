import { useEffect, useState } from "react";
import { MESSAGE } from "../../utils/constants";

const useSearch = ({ movies, isSavedMoviesPage }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { beforeSearching, noMovies } = MESSAGE;

  const [savedSearch, setSavedSearch] = useState({
    search: '',
    short: false,
    savedMovies: [],
  });

  const [searchStatus, setSearchStatus] = useState({
    statusMessage: '',
    isLoading: false,
    isFirstSearch: false,
  });

  const filterSearh = (value) => {
    return movies.filter(
      (movie) =>
        movie.nameRU.trim().toLowerCase().includes(value.search.trim().toLowerCase())
        ||
        movie.nameEN.trim().toLowerCase().includes(value.search.trim().toLowerCase())
    );
  };

  const filterShort = (moviesList) => {
    return moviesList.filter((movie) => movie.duration <= 40);
  };


  const filterMovies = (value) => {

    if (isSavedMoviesPage) {
      setSavedSearch({
        search: value.search,
        short: value.short,
      });
    }
    if (value.short) {
      return filterShort(filterSearh(value));
    } else {
      return filterSearh(value);
    }
  }

  useEffect(() => {
    if ('search' in localStorage && !isSavedMoviesPage) {
      const savedSearch = JSON.parse(localStorage.getItem('search'));
      setSavedSearch({
        search: savedSearch.search,
        short: savedSearch.short,
        savedMovies: savedSearch.savedMovies,
      });
      setFilteredMovies(savedSearch.movies);
    }

    if (!localStorage.getItem('search') && !isSavedMoviesPage) {
      setSearchStatus((data) => {
        return {
          ...data,
          isFirstSearch: true,
          statusMessage: beforeSearching,
        };
      });
    }
  }, [beforeSearching, isSavedMoviesPage]);

  useEffect(() => {
    if (isSavedMoviesPage && savedSearch) {
      setFilteredMovies(savedSearch);
    }
  }, [isSavedMoviesPage, savedSearch])

  useEffect(() => {
    if (isSavedMoviesPage) setFilteredMovies(movies);
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem('search')) {
      setFilteredMovies(savedSearch.savedMovies);
    }
  }, [isSavedMoviesPage, savedSearch]);

  const setLoader = (boolean) => {
    setSearchStatus((data) => {
      return {
        ...data,
        isLoading: boolean,
        isFirstSearch: false,
      };
    });
  };

  const resetStatus = () => {
    setSearchStatus({
      statusMessage: '',
      isLoading: false,
    });
  };

  const handleSubmitSearch = (value) => {
    resetStatus();
    const filteredMovies = filterMovies(value, movies);

    setLoader(true);

    setTimeout(() => {
      if (filteredMovies.length === 0) {
        setSearchStatus((data) => {
          return {
            ...data,
            statusMessage: noMovies,
          };
        });
      }
      setFilteredMovies(filteredMovies);
      setLoader(false);
    }, 300);

    if (!isSavedMoviesPage) {
      localStorage.setItem('search', JSON.stringify({
        savedMovies: filteredMovies,
        short: value.short,
        search: value.search,
      }));
    }
  };

  return { filteredMovies, savedSearch, searchStatus, handleSubmitSearch }
}

export default useSearch;