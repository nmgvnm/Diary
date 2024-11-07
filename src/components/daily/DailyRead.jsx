import React from 'react';
import DOMPurify from "dompurify";
import FormattedDate from '../FormattedDate';

const DailyRead = ({content}) => {
  const sanitizedContent = DOMPurify.sanitize(content.content, {
    ADD_TAGS: ["p"],
    ADD_ATTR: ["class"],
    FORBID_TAGS: ["style"],
  });
  return (
    <div className='daily-content-read-wrapper'>
      <div className="daily-title-box-wrapper" style={{backgroundImage: `url(${content.titleImg})`}}>
        <p className='title'>
          {content.title}
        </p>
        <div className="dateBox">
        <p className='date'>
          <FormattedDate date={content.createdAt} format="YY.MM.DD" />
        </p>
        <p>
          {content.category}
        </p>
        </div>
      </div>
      <div className="content">
      <div className="daily-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
      </div>
       
    </div>
  );
};

export default DailyRead;