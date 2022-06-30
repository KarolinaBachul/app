import React from 'react';
import Comments from './Comments';
import {
  IoIosNutrition,
  IoIosBookmarks,
  IoIosContacts,
  IoIosImages,
} from 'react-icons/io';

import classes from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.cart}>
        <section className={classes.control}>
          <div className={classes.circle1}>
            <IoIosNutrition className={classes.icon} />
          </div>
          <h2>check the recipes we have selected or try our users' recipes</h2>
        </section>
        <section className={classes.control}>
          <div className={classes.circle2}>
            <IoIosBookmarks className={classes.icon2} />
          </div>
          <h2>add your favorite recipes to your virtual cookbook</h2>
        </section>
        <section className={classes.control}>
          <div className={classes.circle3}>
            <IoIosContacts className={classes.icon3} />
          </div>
          <h2>share your favorite recipes with other users</h2>
        </section>
        <section className={classes.control}>
          <div className={classes.circle4}>
            <IoIosImages className={classes.icon} />
          </div>
          <h2>comment on recipes and add photos of dishes</h2>
        </section>
      </div>
      <Comments />
      <div className={classes.div}></div>
    </React.Fragment>
  );
};

export default LandingPage;
