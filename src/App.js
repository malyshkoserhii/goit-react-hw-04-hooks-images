import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import fetchImages from './services/images-api';
import s from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = null;
  const [isLoading, setIsLoading] = useState(false);
  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  useEffect(() => {
    setIsLoading(true);

    fetchImages(searchQuery, currentPage)
      .then(hits => {
        setImages(state => [...state, ...hits]);
        setCurrentPage(state => state + 1);
      })
      .catch(setError(error))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [searchQuery, currentPage]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
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

      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}
    </>
  );
};

export default App;
