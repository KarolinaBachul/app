import classes from './RegisterSuccess.module.css';
import Button from '../../components/Button/Button';

const RegisterSuccess: React.FC = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.main}>
        <h2 className={classes.text}>Hello!</h2>
        <section className={classes.btn_section}>
          <Button className={classes.btn_list}>Recipe List</Button>
          <Button className={classes.btn_cb}>Your Cookbook</Button>
          <Button className={classes.btn_add}>Add Recipe</Button>
        </section>
      </div>
    </div>
  );
};

export default RegisterSuccess;
