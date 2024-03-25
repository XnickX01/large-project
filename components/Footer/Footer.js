import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
    const creators = ['Nicholas King', 'Sam Voor', 'Micheal (Andy) '];
    const websiteName = 'Culinary Canvas';

    return (
        <footer className={classes.footer}> 
            <h3>{websiteName}</h3>
            <ul>
                {creators.map((creator, index) => (
                    <li key={index}>{creator}</li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;