import React from 'react';

const TitleBox = ({title}) => {
  return (
    <div className='title-box-wrapper'>
      <div className="contents">
        <div className="text">
          {title}
        </div>
      </div>
    </div>
  );
};

export default TitleBox;