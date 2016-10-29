import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

const SmallTitle = props => (
  <div className={styles['small-content']}>
    <h1><Link to="/" >Salash!</Link></h1>
  </div>
);

const BigTitle = props => (
  <div className={styles['big-content']}>
    <h1 className={styles['site-title']}> <Link to="/" >Salash!</Link></h1>
    <span className={styles.subheader}>Raw food recipe hub</span>
  </div>
);

export function Header(props, context) {
  /*const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );*/

  return (
    <div className={styles.header}>
      {/*<div className={styles['language-switcher']}>
        <ul>
          <li>Detailed Search</li>
          <li>Add Recipe</li>
          <li>Login</li>
        </ul>
      </div>*/}
      {
        context.router.isActive('/', true) ? <BigTitle /> : <SmallTitle />
      }
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
