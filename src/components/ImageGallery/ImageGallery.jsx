import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <div>
      <Gallery>
        {images.map(image => {
          return <ImageGalleryItem key={image.id} imageSource={image} />;
        })}
      </Gallery>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
