import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import fetchImages from './services/images-api';
import s from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });

    fetchImages({ currentPage, searchQuery })
      .then(hits =>
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState({ isLoading: false }, () =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          }),
        ),
      );
  };

  render() {
    const { images, error, isLoading } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <>
        <Searchbar onChangeForm={this.onChangeQuery} />
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

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
      </>
    );
  }
}

export default App;
