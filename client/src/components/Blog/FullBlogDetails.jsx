import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


import { Grid, Typography, Button, Link } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const FullBlogDetails = ({ blog, handleLike, handleDelete }) => {
    return (
        <Grid item lg={8}>
            <Typography component='h2' variant='h2' gutterBottom={true}>
                {blog.title}
            </Typography>
            <Typography component='h4' variant='h4'>
                Written by {blog.author}
            </Typography>
            <Typography>
                <b>Likes: </b> {blog.likes}
            </Typography>
            <Typography gutterBottom={true}>
                <Button data-cy="likeButton" variant='contained' color='primary' startIcon={<ThumbUpIcon />} onClick={() => handleLike(blog)}>Like</Button>
            </Typography>
            <Typography>
                <b>Added By User:</b>
                <Button component={RouterLink} to={`/users/${blog.user.id}`} startIcon={<PersonIcon />} variant='text' color='primary'>{blog.user.name}</Button>
            </Typography>
            <Typography variant='h6' paragraph={true}>
                <Link target='_blank' rel='noreferrer' href={blog.url}>View Full Blog</Link>
            </Typography>
            <Button data-cy="removeButton" variant='contained' color='secondary' startIcon={<DeleteForeverIcon />} onClick={() => handleDelete(blog)}>Remove</Button>
        </Grid>
    );
};

export default FullBlogDetails;