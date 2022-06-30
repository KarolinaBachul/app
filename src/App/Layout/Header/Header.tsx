import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../../store/auth-context';
import Button from '../../../components/Button/Button';
import Menu from '../../../components/Menu/Menu';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

const Header: React.FC = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const { isLoggedIn, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  const recipesHandler = () => {
    navigate('recipes');
  };

  const favHandler = () => {
    navigate('favourites');
  };

  const hamburgerHandler = () => {
    setMenuIsVisible(true);
  };

  const menuCloseModalHandler = () => {
    setMenuIsVisible(false);
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.title}>Personalize Your Own Cookbook</h1>
      </Link>

      {!isLoggedIn && !loading && (
        <Link to="/login">
          <div>
            <Button>
              Login <BsArrowRight className={classes.icon_anim} />
            </Button>
          </div>
        </Link>
      )}

      {isLoggedIn && (
        <div className={classes.two_btns}>
          <Button onClick={favHandler} className={classes.btn}>
            Favourites
          </Button>

          <Button onClick={recipesHandler} className={classes.btn}>
            All Recipes
          </Button>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}
      {!isLoggedIn && loading && <LoadingDots />}
      <div className={classes.menu}>
        {isLoggedIn && (
          <AiOutlineMenu className={classes.hamb} onClick={hamburgerHandler} />
        )}
        {menuIsVisible && <Menu onDismiss={menuCloseModalHandler} />}
      </div>
    </header>
  );
};
export default Header;
