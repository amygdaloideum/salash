import React, { PropTypes, Component } from 'react';

import styles from './AboutPage.css';

class AboutPage extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <p><span className={styles.red}>salash</span> was written to index the worlds <span className={styles.green}>raw food</span> recipes in one place.</p>
        <p>everybody can add recipes, and <span className={styles.pink}>♥ vote</span> on other users recipes</p>
        <p><span className={styles.orange}>★ favourite</span> recipes to add them to your <span className={styles.red}>salash</span>-cookbook</p>
        <p>recipes with much <span className={styles.pink}>♥ love</span> appear higher in search results</p>
        <p>if you have any suggestions or want to report a bug please contact me at <span className={styles.turquoise}>daniel.bornstrand@gmail.com</span></p>
      </div>
    );
  }
}

export default AboutPage;
