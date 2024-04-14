import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { faUtensils, faUser } from '@fortawesome/free-solid-svg-icons'
import classes from './Header.module.css';
import Link from 'next/link'

export default function Header({onLogout}) {
    
return (
    <header className={classes.header}>
        <h1 className={classes.headerLogo}>
            <Link className={classes.link} href="/">
            Culinary Canvas &nbsp;
            <FontAwesomeIcon icon={faUtensils} size='1x' />
            </Link>
        </h1>
        <ul className={classes.headerNav}>
            <Link  className={classes.link} href="/community">
                <li>Community</li>
            </Link>
            <li></li>
            <li onClick={onLogout}>
                <FontAwesomeIcon icon={faUser} size='1x'/>
            </li>
        </ul>
    </header>
);
}