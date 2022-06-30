import classes from './LoadingDots.module.css';

const LoadingDots: React.FC = () => {
  return (
    <div className={classes.div}>
      <i className={classes.loader}></i>
    </div>
  );
};

export default LoadingDots;
