import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import fetchImages from 'api/PixabayAPI';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

import { Container, Loader } from './App.styled';

const perPage = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    if (query === '') {
      return;
    }

    async function addImages() {
      setIsLoading(true);

      try {
        const searchQuery = query.split('/')[1];
        const response = await fetchImages(searchQuery, page, perPage);

        setLastPage(Math.ceil(response.total / perPage));
        setImages(prevState => [...prevState, ...response.hits]);

        if (page === 1) {
          toast.info(`Wee found ${response.total} images`);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          return toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [query, page]);

  useEffect(() => {
    if (page === lastPage) {
      setIsLastPage(true);
      toast.info('You have reached the end of the gallery');
    }
  }, [page, lastPage]);

  const handleSubmit = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setIsLastPage(false);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
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
      {images.length > 0 && !isLastPage && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
    </Container>
  );
};

export default App;
