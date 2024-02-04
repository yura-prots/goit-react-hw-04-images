import { Component } from 'react';
import PropTypes from 'prop-types';

import ModalWindow from 'components/ModalWindow';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props.imageSource;

    return (
      <GalleryItem>
        <GalleryImage src={webformatURL} alt={tags} onClick={this.openModal} />
        <ModalWindow
          isOpen={isModalOpen}
          onClose={this.closeModal}
          largeImage={largeImageURL}
          tags={tags}
        />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageSource: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
