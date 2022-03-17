import { Button, Input, Modal, TextareaAutosize, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createBlog, hideModal } from '../../redux/actions';

export default function CreateBlogModal() {
  const [data, setData] = useState({
    title: '',
    description: '',
    file: '',
  });
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const classes = useStyles();

  const onClose = useCallback(() => {
    dispatch(hideModal());
    setData({
      title: '',
      description: '',
      file: '',
    });
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    dispatch(createBlog.createBlogRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div className={classes.paper} id='simple-modal-title'>
      <h2>Create New Blog</h2>
      <form noValidate autoComplete='off' className={classes.form}>
        <TextField
          className={classes.title}
          required
          label='Title'
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextareaAutosize
          className={classes.textarea}
          rowsMin={10}
          rowsMax={15}
          placeholder='description...'
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        {/* <FileBase64
          accept='image/*'
          multiple={false}
          type='file'
          value={data.file}
          onDone={({ base64 }) => setData({ ...data, file: base64 })}
        /> */}
        <Input id="file" type="file" 
          accept='image/*'
          multiple={false}
          onChange={(event) => setData({ ...data, file: event.target.files[0] })} />
        <div className={classes.footer}>
          <Button
            variant='contained'
            color='primary'
            component='span'
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
