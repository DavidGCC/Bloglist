import blogService from '../services/blogs';
import { createSuccessMessage, createErrorMessage } from './notificationReducer';


export const initializeBlogsAction = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT',
            data: blogs
        });
    };
};
export const createBlogAction = blog => {
    return dispatch => {
        blogService.createBlog(blog)
            .then(response => {
                dispatch({
                    type: 'CREATE',
                    response
                });
                dispatch(createSuccessMessage(`Created New Blog ${blog.title} by ${blog.author}`));
            })
            .catch(err => dispatch(createErrorMessage(`Couldn't Create Blog. Title, Author and Url Fields are Required. Message: ${err.message}`)));
    };
};

export const likeBlogAction = blog => {
    return dispatch => {
        blogService.like(blog)
            .then(() => {
                dispatch({
                    type: 'LIKE',
                    id: blog.id
                });
                dispatch(createSuccessMessage(`Liked Blog ${blog.title}.`));
            })
            .catch(err => dispatch(createErrorMessage(`Couldn't Like Blog ${blog.title}. Message: ${err.response.data.error}`))            );
    };
};

export const deleteBlogAction = blog => {
    return dispatch => {
        blogService.deleteBlog(blog)
            .then(() => {
                dispatch({
                    type: 'DELETE',
                    id: blog.id
                });
                dispatch(createSuccessMessage(`Successfully Deleted Blog ${blog.title} by ${blog.author}`));
            })
            .catch(err => dispatch(createErrorMessage(`Couldn't Delete Blog ${blog.title}. Message: ${err.response.data.error}`)));
    };
};

export const createCommentAction = (content, blog) => {
    return dispatch => {
        blogService.createComment(content, blog)
            .then((comment) => {
                dispatch({
                    type: 'COMMENT',
                    comment
                });
                dispatch(createSuccessMessage('Successfully Created a Comment'));
            })
            .catch(err => dispatch(createErrorMessage(`Couldn't Comment On This Blog. Message: ${err.response.data.error}`)));
    };
};

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT':
        return action.data;
    case 'CREATE':
        return [...state, action.response];
    case 'DELETE':
        return state.filter(blog => blog.id !== action.id);
    case 'LIKE':
        return state.map(blog => {
            if (blog.id === action.id) {
                return { ...blog, likes: blog.likes + 1 };
            } else {
                return { ...blog };
            }
        });
    case 'COMMENT':
        return state.map(blog => {
            if (blog.id === action.comment.blog) {
                return { ...blog, comments: [...blog.comments, action.comment] };
            } else {
                return { ...blog };
            }
        });
    default:
        return state;
    }
};

export default blogReducer;