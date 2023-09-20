/* eslint-disable @next/next/no-img-element */

import { AuthService } from 'app/zynerator/security/Auth.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Badge } from "primereact/badge";
import { Chip } from 'primereact/chip';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '/layout/context/layoutcontext';
import { AppTopbarRef } from '/types/types';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [connectedUtilisateur, setConnectedUtilisateur] = useState({ nom: "", prenom: "", roles: [] });

    const router = useRouter();

    const authService = new AuthService();

    useEffect(() => {
        const tokenDecoded = authService.decodeJWT();
        console.log({tokenDecoded})
        setConnectedUtilisateur(tokenDecoded);
    }, []);

    const signOut = () => {
        authService.signOut();
        router.push("/auth");
    }

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>G - Documentaire</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <div className="user-profile p-overlay-badge" onClick={() => router.push("/profile")}>
                    <Chip
                        label={`${connectedUtilisateur.prenom} ${connectedUtilisateur.nom}`}
                        icon="pi pi-user"
                        className="text-lg pr-5 pl-5"
                    />
                    <Badge value={connectedUtilisateur.roles[0] === "ROLE_ADMIN" ? "Admin" :  "Collaborateur"} />
                </div>
                <div className='deconnexion-btn' onClick={signOut}>
                    <Chip
                        label="Deconnexion"
                        icon="pi pi-sign-out"
                        className="text-lg"
                    />
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;