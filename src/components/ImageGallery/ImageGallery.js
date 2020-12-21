import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    modalWindowImage: null,
    alt: null,
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      modalWindowImage: largeImageURL,
      alt: tags,
    });
  };

  onCloseModal = () => {
    this.setState({
      modalWindowImage: null,
      alt: null,
    });
  };

  render() {
    const { modalWindowImage, alt } = this.state;
    const { images } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map((image, index) => (
            <ImageGalleryItem
              key={index}
              image={image}
              onClick={this.showModal}
            />
          ))}
        </ul>
        {modalWindowImage && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={modalWindowImage} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.protoTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
