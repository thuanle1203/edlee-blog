import React, { useCallback } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../../../redux/actions';

export default function BlogupdateBlog({ blog }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLikeBtnClick = useCallback(() => {
    dispatch(
      updateBlog.updateBlogRequest({ ...blog, likes: blog.likes + 1 })
    );
  }, [dispatch, blog]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>A</Avatar>}
        title={blog.author}
        subheader={moment(blog.updatedAt).format('HH:MM MMM DD,YYYY')}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia
        image={blog.imgUrl || ''}
        title='Title'
        className={classes.media}
      />
      <CardContent>
        <Typography variant='h5' color='textPrimary'>
          {blog.title}
        </Typography>
        <Typography variant='body2' component='p' color='textSecondary'>
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onLikeBtnClick}>
          <FavoriteIcon />
          <Typography component='span' color='textSecondary'>
            {`${blog.likes} likes`}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
