import { useState } from 'react';
import PropTypes from 'prop-types';

import ModalWindow from 'components/ModalWindow';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  imageSource: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModel = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} onClick={toggleModel} />
      <ModalWindow
        isOpen={isModalOpen}
        onClose={toggleModel}
        largeImage={largeImageURL}
        tags={tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageSource: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
