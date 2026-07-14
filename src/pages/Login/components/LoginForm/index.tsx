import { memo } from 'react';
import { assetUrl } from 'utils/url';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from 'pages/Login/validation/index.schema';
import SocialSphereApiAuth from 'api/socialSphereApiAuth';
import { useNavigate, Link } from 'react-router';
import { toast } from 'core_components/Toaster';
import routes from 'routes/index';

function LoginForm() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: {
            isSubmitting,
            isValid,
        },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: LoginFormData) => {
        try {
            const response = await SocialSphereApiAuth.login(values);

            SocialSphereApiAuth.saveSession(response);

            toast.success('Login successful');

            navigate('/feed');
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Unable to login';

            toast.error(message);
        }
    };

    return (
        <>
            <p className="_social_login_content_para _mar_b8">Welcome back</p>
            <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

            <button type="button" className="_social_login_content_btn _mar_b40">
                <img src={assetUrl('/auth/google.svg')} alt="Image" className="_google_img" /> <span>Or sign-in with google</span>
            </button>

            <div className="_social_login_content_bottom_txt _mar_b40">
                <span>Or</span>
            </div>

            <form className="_social_login_form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                            <label className="_social_login_label _mar_b8">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input {...field} type="email" className="form-control _social_login_input" />
                                        {fieldState.error && (
                                            <p className="text-danger mt-1 mb-0">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                            <label className="_social_login_label _mar_b8">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input {...field} type="password" className="form-control _social_login_input" />
                                        {fieldState.error && (
                                            <p className="text-danger mt-1 mb-0">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="form-check _social_login_form_check">
                            <input
                                className="form-check-input _social_login_form_check_input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                defaultChecked
                            />
                            <label className="form-check-label _social_login_form_check_label" htmlFor="flexRadioDefault2">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="_social_login_form_left">
                            <p className="_social_login_form_left_para">Forgot password?</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_login_form_btn _mar_t40 _mar_b60">
                            <button
                                type="submit"
                                className="_social_login_form_btn_link _btn1"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login now'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="_social_login_bottom_txt">
                <p className="_social_login_bottom_txt_para">
                    Dont have an account? <Link to={routes.registration.path}>Create New Account</Link>
                </p>
            </div>
        </>
    );
}

export default memo(LoginForm);
