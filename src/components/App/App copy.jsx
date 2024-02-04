import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import fetchImages from 'api/PixabayAPI';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

import { Container, Loader } from './App.styled';

class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    lastPage: null,
    images: [],
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, perPage, lastPage } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const searchQuery = query.split('/')[1];
        const response = await fetchImages(searchQuery, page, perPage);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));

        if (page === 1) {
          toast.info(`Wee found ${response.total} images`);
        }

        this.setState({
          lastPage: Math.ceil(response.total / perPage),
        });

        if (page === lastPage) {
          toast.info('You have reached the end of the gallery');
        }
      } catch (error) {
        return toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, isLoading, page, lastPage } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && (
          <Loader>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#3f51b5"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </Loader>
        )}
        {images.length > 0 && page !== lastPage && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
      </Container>
    );
  }
}

export default App;
