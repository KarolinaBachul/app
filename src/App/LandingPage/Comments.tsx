import React, { useState, useEffect } from 'react';

import CommentItem from './CommentItem';
import classes from './Comments.module.css';

const DUMMY_COMMENTS = [
  {
    id: 'c1',
    user: '~ Anna ~',
    comment: '"Finally, no more wondering what to cook for dinner tomorrow!"',
    date: '02.02.2021',
  },
  {
    id: 'c2',
    user: '~ John ~',
    comment:
      '"I love to experiment while cooking, now I can share my ideas with others!"',
    date: '10.03.2021',
  },
  {
    id: 'c3',
    user: '~ Kate ~',
    comment:
      '"All my favorite recipes in one place! Always with me, wherever I am!"',
    date: '23.06.2021',
  },
];

const Comments: React.FC = () => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(
    Number((DUMMY_COMMENTS.length / 2).toFixed())
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentVisibleIndex((currentIndex) => {
        if (currentIndex + 1 >= DUMMY_COMMENTS.length) {
          return 0;
        } else {
          return currentIndex + 1;
        }
      });
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const commentsList = DUMMY_COMMENTS.map((comment, index) => (
    <CommentItem
      key={comment.id}
      comment={comment.comment}
      name={comment.user}
      date={comment.date}
      visible={index === currentVisibleIndex}
    />
  ));

  return <div className={classes.comments}>{commentsList}</div>;
};

export default Comments;
