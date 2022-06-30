import classes from './Footer.module.css';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io';
import React from 'react';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p>FIND US ON</p>
      <IoLogoFacebook className={classes.icon} />{' '}
      <IoLogoInstagram className={classes.icon} />
      <IoLogoTwitter className={classes.icon} />
    </div>
  );
};

export default Footer;
