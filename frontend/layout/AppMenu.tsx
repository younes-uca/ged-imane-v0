/* eslint-disable @next/next/no-img-element */

import AppMenuitem from '/layout/AppMenuitem';
import { MenuProvider } from '/layout/context/menucontext';
import { AppMenuItem } from '/types/types';
import { AuthService } from 'app/zynerator/security/Auth.service';
import React, { useEffect, useState } from 'react';


const AppMenu = () => {

    const [model, setModel] = useState<AppMenuItem[]>([] as AppMenuItem[]);
    const authService = new AuthService();
    const modelAdmin: AppMenuItem[] = [
        {
            label: 'Acceuil',
            items: [{ label: 'Tableau de bord', icon: 'pi pi-fw pi-th-large', to: '/dashboard' }]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '',
            items: [
                // {
                //     label: 'Auth',
                //     icon: 'pi pi-fw pi-user',
                //     items: [
                //         {
                //             label: 'Error',
                //             icon: 'pi pi-fw pi-times-circle',
                //             to: '/auth/error'
                //         },
                //         {
                //             label: 'Access Denied',
                //             icon: 'pi pi-fw pi-lock',
                //             to: '/auth/access'
                //         }
                //     ]
                // },
                {
                    label: 'Référentiel du Document',
                    icon: 'pi pi-fw pi-table',
                    items: [
                         {
                            label: "Champs d'indexations",
                            to: '/admin/view/referentiel-doc/index-element/list'
                        },
                        {
                            label: 'Catégories de document',
                            to: '/admin/view/referentiel-doc/document-categorie/list'
                        },
                        // {
                        //     label: 'Liste document categorie model',
                        //     to: '/admin/view/referentiel-doc/document-categorie-model/list'
                        // },
                        // {
                        //     label: 'Liste tag',
                        //     to: '/admin/view/referentiel-doc/tag/list'
                        // },
                        // {
                        //     label: 'Liste document categorie index',
                        //     to: '/admin/view/referentiel-doc/document-categorie-index/list'
                        // },
                        {
                            label: 'Etats de validation de Document',
                            to: '/admin/view/referentiel-doc/document-state/list'
                        },
                        {
                            label: 'Types de Document',
                            to: '/admin/view/referentiel-doc/document-type/list'
                        },
                        // {
                        //     label: 'Liste document categorie index rule',
                        //     to: '/admin/view/referentiel-doc/document-categorie-index-rule/list'
                        // },
                       
                    ]
                },
                {
                    label: 'Gestion de Documents',
                    icon: 'pi pi-fw pi-file-o',
                    items: [
                        {
                            label: 'Liste des documents',
                            to: '/admin/view/doc/document/list',
                        },
                    ]
                },
                {
                    label: "Gestion d'Organigramme",
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: "Types d'entités administratives",
                            to: '/admin/view/organigramme/entite-administrative-type/list'
                        },
                        {
                            label: 'Entités administratives',
                            to: '/admin/view/organigramme/entite-administrative/list'
                        },
                        {
                            label: 'Liste des utilisateurs',
                            to: '/admin/view/organigramme/utilisateur/list'
                        },
                        {
                            label: "Civilités d'utilisateurs",
                            to: '/admin/view/organigramme/gender/list'
                        },
                        
                    ]
                },
                {
                    label: 'Référentiel de partage',
                    icon: 'pi pi-fw pi-share-alt',
                    items: [
                        {
                            label: 'États des utilisateurs',
                            to: '/admin/view/referentiel-partage/etat-utilisateur/list'
                        },
                        {
                            label: 'Roles des utilisateurs',
                            to: '/admin/view/referentiel-partage/role-utilisateur/list'
                        },
                        {
                            label: "Groupes d'utilisateurs",
                            to: '/admin/view/referentiel-partage/groupe/list'
                        },
                        {
                            label: "Droits d'accès partagés",
                            to: '/admin/view/referentiel-partage/access-share/list'
                        },
                    ]
                },
            ]
        },

    ];
    const modelAgent: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '',
            items: [

                // {
                //     label: 'Auth',
                //     icon: 'pi pi-fw pi-user',
                //     items: [
                //         {
                //             label: 'Error',
                //             icon: 'pi pi-fw pi-times-circle',
                //             to: '/auth/error'
                //         },
                //         {
                //             label: 'Access Denied',
                //             icon: 'pi pi-fw pi-lock',
                //             to: '/auth/access'
                //         }
                //     ]
                // },
                {
                    label: 'Référentiel du Document',
                    icon: 'pi pi-fw pi-table',
                    items: [
                        {
                            label: 'Liste des catégories de document',
                            to: '/admin/view/referentiel-doc/document-categorie/list'
                        },
                        // {
                        //     label: 'Liste document categorie model',
                        //     to: '/admin/view/referentiel-doc/document-categorie-model/list'
                        // },
                        // {
                        //     label: 'Liste tag',
                        //     to: '/admin/view/referentiel-doc/tag/list'
                        // },
                        // {
                        //     label: 'Liste document categorie index',
                        //     to: '/admin/view/referentiel-doc/document-categorie-index/list'
                        // },
                        {
                            label: 'Liste des états de Document',
                            to: '/admin/view/referentiel-doc/document-state/list'
                        },
                        {
                            label: 'Liste des types de Document',
                            to: '/admin/view/referentiel-doc/document-type/list'
                        },
                        // {
                        //     label: 'Liste document categorie index rule',
                        //     to: '/admin/view/referentiel-doc/document-categorie-index-rule/list'
                        // },
                        // {
                        //     label: 'Liste index element',
                        //     to: '/admin/view/referentiel-doc/index-element/list'
                        // },
                    ]
                },
            ]
        },

    ];

    useEffect(() => {
        const roleConnectedUser = authService.getRoleConnectedUser();
        if (roleConnectedUser === 'ROLE_ADMIN') {
            setModel(modelAdmin)
        }
        if (roleConnectedUser === 'ROLE_AGENT') {
            setModel(modelAgent)
        }
    }, [])

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> :
                        <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};


export default AppMenu;
