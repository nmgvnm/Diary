import React from 'react';
import TitleBox from '../components/TitleBox';
import PostList from '../components/weekly/PostList';

const Weekly = () => {
  return (
    <div className='page'>
      <TitleBox title="Weekly Memory" />
      <PostList />
    </div>
  );
};

export default Weekly;