import { useEffect, useRef, useState } from 'react';
import './App.css';

const devMode = !window.invokeNative;

const App = () => {
    const [theme, setTheme] = useState('dark'); // Mettre le thème à 'dark' pour un design sombre
    const [direction, setDirection] = useState('N');
    const [notificationText, setNotificationText] = useState('Texte de la notification');
    const appDiv = useRef(null);

    // Le code existant pour les fonctions telles que setPopUp, setContextMenu, etc. reste inchangé.

    useEffect(() => {
        if (devMode) {
            document.getElementsByTagName('html')[0].style.visibility = 'visible';
            document.getElementsByTagName('body')[0].style.visibility = 'visible';
            return;
        } else {
            getSettings().then((settings) => setTheme(settings.display.theme));
            onSettingsChange((settings) => setTheme(settings.display.theme));
        }

        fetchNui('getDirection').then((direction) => setDirection(direction));

        window.addEventListener('message', (e) => {
            if (e.data?.type === 'updateDirection') setDirection(e.data.direction);
        });
    }, []);

    useEffect(() => {
        if (notificationText === '') setNotificationText('Texte de la notification');
    }, [notificationText]);

    return (
        <AppProvider>
            <div className='app' ref={appDiv} data-theme={theme}>
                <div className='app-wrapper'>
                    <div className='header'>
                        <div className='title'>Darkweb</div>
                    </div>
                    <div className='categories-wrapper'>
                        <div className='category'>
                            <h3>Armes</h3>
                            {/* Ajouter le contenu relatif à la catégorie "Armes" */}
                        </div>
                        <div className='category'>
                            <h3>Objet divers</h3>
                            {/* Ajouter le contenu relatif à la catégorie "Objet divers" */}
                        </div>
                        <div className='category'>
                            <h3>Informations</h3>
                            {/* Ajouter le contenu relatif à la catégorie "Informations" */}
                        </div>
                    </div>
                    <div className='button-wrapper'>
                        {/* Le reste des boutons et des entrées reste inchangé */}
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

const AppProvider = ({ children }) => {
    if (devMode) {
        return <div className='dev-wrapper'>{children}</div>;
    } else return children;
};

// La fonction fetchData reste inchangée

export default App;
