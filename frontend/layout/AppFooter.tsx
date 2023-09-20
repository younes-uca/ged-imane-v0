import React, { useContext } from 'react';

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <span>Tous droits réservés &copy; {new Date().getFullYear()}</span>
        </div>
    );
};

export default AppFooter;
