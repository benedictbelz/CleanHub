import * as _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './Header.scss';

export default function Header() {
    const [top, setTop] = useState<boolean>(true);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop <= 10) {
            setTop(true);
        } else {
            setTop(false);
        }
    };

    return (
        <div id='header' className={top ? 'top' : ''}>
            <a href='https://www.cleanhub.com/'>
                <img alt='CleanHub' src={'assets/images/logo.svg'} />
            </a>
        </div>
    );
}
