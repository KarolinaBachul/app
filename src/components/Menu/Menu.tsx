import Button from '../Button/Button';
import classes from './Menu.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

type Props = {
  onDismiss: () => void;
};

const Menu: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    navigate('/');
    props.onDismiss();
  };

  const recipesHandler = () => {
    navigate('recipes');
    props.onDismiss();
  };

  const favHandler = () => {
    navigate('favourites');
    props.onDismiss();
  };

  return (
    <Modal
      onDismiss={props.onDismiss}
      className={classes.modal}
      nameClass={classes.title}
    >
      <div className={classes.menu}>
        <Button onClick={favHandler} className={classes.btn}>
          Favourites
        </Button>

        <Button onClick={recipesHandler} className={classes.btn}>
          All Recipes
        </Button>
        <Button onClick={logoutHandler} className={classes.btn}>
          Logout
        </Button>
      </div>
    </Modal>
  );
};
export default Menu;
