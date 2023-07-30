import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Collection from '../components/Collection/Collection';
import Header from '../components/Header/Header';
import './Main.scss';

function Main() {
    return (
        <div id='main'>
            <Header />
            <div id='page'>
                <h1>Hub status</h1>
                <p>Check the current status of all hubs currently connected with CleanHub.</p>
                <Collection />
            </div>
        </div>
    );
}

createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
