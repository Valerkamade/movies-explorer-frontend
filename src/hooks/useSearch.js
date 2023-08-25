import { useEffect, useState } from "react";
import { KEYWORD_SEARCH, MESSAGE, TIME_DOWNLOAD, TIME_OUT_PRELOADER, TIME_SHORT_MOVIES } from "../utils/constants";
import { useLocation } from "react-router-dom";

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

  const { pathname } = useLocation();

  const filterSearh = (value) => {
    return movies.filter(
      (movie) =>
        movie.nameRU.trim().toLowerCase().includes(value.search.trim().toLowerCase())
        ||
        movie.nameEN.trim().toLowerCase().includes(value.search.trim().toLowerCase())
    );
  };

  const filterShort = (moviesList) => {
    return moviesList.filter((movie) => movie.duration <= TIME_SHORT_MOVIES);
  };

  const filterMovies = (value) => {
    if (value.short) {
      return filterShort(filterSearh(value));
    } else {
      return filterSearh(value);
    }
  }

  useEffect(() => {
    if (isSavedMoviesPage && !searchStatus.isLoading) {
      setFilteredMovies(filterMovies(savedSearch));
    }
  }, [isSavedMoviesPage, savedSearch])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setSearchStatus(searchStatus => ({ ...searchStatus, statusMessage: noMovies }));
    } else {
      resetStatus();
    }
  }, [filteredMovies]);


  useEffect(() => {
    if (KEYWORD_SEARCH in localStorage && !isSavedMoviesPage) {
      const savedSearch = JSON.parse(localStorage.getItem(KEYWORD_SEARCH));
      setSavedSearch({
        search: savedSearch.search,
        short: savedSearch.short,
        savedMovies: savedSearch.savedMovies,
      });
      setFilteredMovies(savedSearch.savedMovies);
    }

    if (!localStorage.getItem(KEYWORD_SEARCH) && !isSavedMoviesPage) {
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
    if (isSavedMoviesPage) setFilteredMovies(filterMovies(savedSearch));
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem(KEYWORD_SEARCH)) {
      setFilteredMovies(savedSearch.savedMovies);
    }
  }, [isSavedMoviesPage, savedSearch]);

  const setLoader = (boolean) => {
    setSearchStatus((data) => {
      return {
        ...data,
        isLoading: boolean,
        isFirstSearch: !boolean && false,
      };
    });
  };

  useEffect(() => { resetStatus() }, [pathname])

  const resetStatus = () => {
    setSearchStatus({
      statusMessage: '',
      isLoading: false,
    });
  };

  const handleSubmitSearch = (value) => {
    if (isSavedMoviesPage) {
      setSavedSearch({
        search: value.search,
        short: value.short,
      });
    }

    resetStatus();
    setLoader(true);
    const data = filterMovies(value);
    setTimeout(() => {
      if (data.length === 0) {
        setSearchStatus((data) => {
          return {
            ...data,
            statusMessage: noMovies,
          };
        });
      }
      setFilteredMovies(data);
      setLoader(false);
    }, searchStatus.isFirstSearch ? TIME_DOWNLOAD : TIME_OUT_PRELOADER);

    if (!isSavedMoviesPage) {
      localStorage.setItem(KEYWORD_SEARCH, JSON.stringify({
        savedMovies: data,
        short: value.short,
        search: value.search,
      }));
    }

  };
  return { filteredMovies, savedSearch, searchStatus, handleSubmitSearch, setSearchStatus, resetStatus }
}

export default useSearch;