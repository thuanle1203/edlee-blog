import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';

import Blog from './Blog';
import { blogsState$ } from '../../redux/selectors';

export default function BlogList() {
  const dispatch = useDispatch();
  const blogs = useSelector(blogsState$);

  useEffect(() => {
    dispatch(actions.getBlogs.getBlogsRequest());
  }, [dispatch]);

  return (
    <Grid container spacing={2} alignItems='stretch'>
      {blogs.map((blog) => (
        <Grid key={blog.id} item xs={12} sm={6}>
          <Blog blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
}
