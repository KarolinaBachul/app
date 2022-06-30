import classes from './CommentItem.module.css';

type Props = {
  comment: string;
  name: string;
  date: string;
  visible: boolean;
};

const CommentItem: React.FC<Props> = ({ comment, name, date, visible }) => {
  return (
    <div className={`${classes.comment} ${visible ? '' : classes.hidden}`}>
      <h3>{comment}</h3>
      <h4>{name}</h4>
      <p>{date}</p>
    </div>
  );
};

export default CommentItem;
