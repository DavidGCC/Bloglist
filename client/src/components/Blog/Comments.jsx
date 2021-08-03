import React from 'react';
import { Typography, Grid, ListItem, ListItemIcon, TextField, Button, List, ListItemText } from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CommentIcon from '@material-ui/icons/Comment';


const Comments = ({ comments, comment, submitComment }) => {
    return (
        <Grid container item lg={4} alignContent='center' justify='flex-start' direction="column">
            <Typography variant='h3' component='h3' gutterBottom={true}>
                Comments
            </Typography>
            <form onSubmit={submitComment}>
                <Grid container spacing={2} alignItems='flex-end'>
                    <Grid item>
                        <TextField id="commentField" label="Add Comment" {...{ ...comment.input }} />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant='contained' color='primary' startIcon={<AddCommentIcon />}>Comment</Button>
                    </Grid>
                </Grid>
            </form>
            <List>
                {comments.map(comment => (
                    <ListItem key={comment.id}>
                        <ListItemIcon>
                            <CommentIcon />
                        </ListItemIcon>
                        <ListItemText>
                            {comment.content}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
};

export default Comments;