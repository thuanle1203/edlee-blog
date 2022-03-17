import React from 'react';
import { Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import BlogList from '../components/BlogList';
import useStyles from './styles';
import { showModal } from '../redux/actions';
import CreateBlogModal from '../components/CreateBlogModal';

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openCreateBlogModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Header />
      <BlogList />
      <CreateBlogModal />
      <Fab
        color='primary'
        className={classes.fab}
        onClick={openCreateBlogModal}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}
