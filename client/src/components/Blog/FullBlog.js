import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useField } from '../../hooks/index';
import { likeBlogAction, deleteBlogAction, createCommentAction } from '../../reducers/blogsReducer';

import Comments from './Comments';
import FullBlogDetails from './FullBlogDetails';

const useStyles = makeStyles({
    container: {
        textAlign: 'center'
    }
});


const FullBlog = ({ blogId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId));
    const comment = useField('text');
    const history = useHistory();

    const handleLike = blog => dispatch(likeBlogAction(blog));

    const handleDelete = blog => {
        dispatch(deleteBlogAction(blog));
        history.push('/');
    };

    const submitComment = async (event) => {
        event.preventDefault();
        dispatch(createCommentAction(comment.input.value, blog));
        comment.reset();
    };
    if (blog) {
        return (
            <Grid container className={classes.container} spacing={5} justify='center'>
                <FullBlogDetails blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
                <Comments comments={blog.comments} comment={comment} submitComment={submitComment} />
            </Grid>
        );
    } else {
        return (
            <h3>Loading...</h3>
        );
    }
};

export default FullBlog;