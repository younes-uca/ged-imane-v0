import { LayoutContext } from 'layout/context/layoutcontext';
import { useContext, useEffect } from 'react';
import { AppConfigProps } from 'types/types';

const GED_BACKEND_BASE_URL = "http://34.125.71.106:8036/";
export const AUTH_URL = GED_BACKEND_BASE_URL + 'login';
export const CHANGE_PASSWORD_URL = GED_BACKEND_BASE_URL + 'api/admin/users/changePassword';
export const ROLES_URL = GED_BACKEND_BASE_URL + "api/roles/";
export const ADMIN_URL = GED_BACKEND_BASE_URL + 'api/admin/';
export const AGENT_URL = GED_BACKEND_BASE_URL + 'api/agent/';
export const TRANSLATION_URL = GED_BACKEND_BASE_URL + 'api/open/translation/lang/';
export const TRANSLATION_DEFAULT = typeof window !== 'undefined' ? navigator.language.split("-")[0] : "en";
export const TRANSLATION_FALLBACK = 'en';

const AppConfig = (props: AppConfigProps) => {
    const { layoutConfig } = useContext(LayoutContext);

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return <></>
};

export default AppConfig;
