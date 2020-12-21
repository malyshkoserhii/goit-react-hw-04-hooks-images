import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import fetchImages from './services/images-api';
import s from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);

    async function request() {
      try {
        const fetch = await fetchImages(query, currentPage);
        setImages(state => [...state, ...fetch]);
        scrollToloadMoreBtn();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) request();
  }, [query, currentPage]);

  const loadMorePhotoes = () => {
    setIsLoading(true);
    setCurrentPage(state => state + 1);
  };

  const onChangeQuery = query => {
    setQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const scrollToloadMoreBtn = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Searchbar onChangeForm={onChangeQuery} />
      {error && <p>{error.message}</p>}

      <ImageGallery images={images} />

      {isLoading && (
        <div className={s.LoaderWrapper}>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        </div>
      )}

      {shouldRenderLoadMoreButton && <Button onClick={loadMorePhotoes} />}
    </>
  );
};

export default App;
