import Header from './Header/Header';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';

const Layout: React.FC = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 10;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div style={{ height: '100%' }}>{props.children}</div>
      {isVisible && <Footer />}
    </div>
  );
};

export default Layout;
