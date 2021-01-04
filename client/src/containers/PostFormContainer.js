import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/PostActions';
// import PostForm from '../containers/AllPostContainer';
import PostForm from "../components/AddPost"

class PostFormContainer extends Component {   
    render() {
        return (
            <div>
                 <PostForm addPost={ this.props.addPost } />
            </div>
           
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (title, content) => {
            dispatch(addPost(title, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(PostFormContainer);