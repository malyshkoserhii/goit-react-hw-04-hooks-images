import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  const [modalWindowImage, setModalWindowImage] = useState(null);
  const [alt, setAlt] = useState(null);

  const showModal = (largeImageURL, tags) => {
    setModalWindowImage(largeImageURL);
    setAlt(tags);
  };

  const onCloseModal = () => {
    setModalWindowImage(null);
    setAlt(null);
  };

  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map((image, index) => (
          <ImageGalleryItem key={index} image={image} onClick={showModal} />
        ))}
      </ul>
      {modalWindowImage && (
        <Modal onCloseModal={onCloseModal}>
          <img src={modalWindowImage} alt={alt} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.protoTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
