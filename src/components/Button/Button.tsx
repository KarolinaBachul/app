import classes from './Button.module.css';

type Props = {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: any;
};

const Button: React.FC<Props> = ({
  children,
  className = '',
  type,
  disabled = false,
  loading = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${classes.btn} ${
        disabled ? classes.disabled_btn : ''
      } ${loading ? classes.loader_dis_btn : ''}`}
      type={type}
      disabled={disabled}
    >
      {' '}
      {children}
      {loading && <i className={classes.loader}></i>}
    </button>
  );
};

export default Button;
