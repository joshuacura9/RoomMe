import React from 'react';
import Post from './Post';

const Posts = (props) => {
  let posts = props.posts.map((post, index) => {
    return (
      <Post
        key={index}
        post={post} 
        deletePost={props.deletePost}
        updatePost={props.updatePost}
      />
    );
  });

  return (
    <ul>
      {posts}
    </ul>
  );
};

export default Posts;