import { type ReactNode } from 'react';
import routes from 'routes/index';
import { assetUrl } from 'utils/url';
import LoginLeftPanel from 'pages/Login/components/LoginLeftPanel';
import RegistrationLeftPanel from 'pages/Registration/components/RegistrationLeftPanel';
import { AuthLayoutPageEnum } from './utils';

export interface AuthLayoutProps {
    page: AuthLayoutPageEnum;
    children: ReactNode;
}

const getLeftPanelPage = (page: AuthLayoutPageEnum): ReactNode => {
    switch (page) {
        case AuthLayoutPageEnum.LOGIN:
            return <LoginLeftPanel />;
        case AuthLayoutPageEnum.REGISTRATION:
            return <RegistrationLeftPanel />;
        default:
            return null;
    }
};

function Auth({ page, children }: AuthLayoutProps) {
    const leftPanel = getLeftPanelPage(page);

    return (
        <section className={`_social_${page}_wrapper _layout_main_wrapper`}>
            <div className="_shape_one">
                <img src={assetUrl('/auth/shape1.svg')} alt="" className="_shape_img" />
                <img src={assetUrl('/auth/dark_shape.svg')} alt="" className="_dark_shape" />
            </div>
            <div className="_shape_two">
                <img src={assetUrl('/auth/shape2.svg')} alt="" className="_shape_img" />
                <img src={assetUrl('/auth/dark_shape1.svg')} alt="" className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_shape_three">
                <img src={assetUrl('/auth/shape3.svg')} alt="" className="_shape_img" />
                <img src={assetUrl('/auth/dark_shape2.svg')} alt="" className="_dark_shape _dark_shape_opacity" />
            </div>

            <div className={`_social_${page}_wrap`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className={`_social_${page}_left`}>
                                <div className={`_social_${page}_left_image`}>{leftPanel}</div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className={`_social_${page}_content`}>
                                <div className={`_social_${page}_left_logo _mar_b28`}>
                                    <a href={routes.home.path}>
                                        <img src={assetUrl('/logo.svg')} alt="Social Sphere" className="_left_logo" />
                                    </a>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auth;
