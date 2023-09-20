import { NextPageWithLayout } from 'next';
import { ReactNode } from 'react';

import ProfileContainer from 'app/component/profile/profile.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const Profile: NextPageWithLayout = () => {
    return <ProfileContainer />
}

Profile.getLayout = function getLayout(page: ReactNode) {
    return (
        <AuthGuard>
            <Layout>
                {page}
            </Layout>
        </AuthGuard>
    )
}

export default Profile;
