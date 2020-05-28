import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box, LinearProgress } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import authAPI from '../../api/auth.api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import './Auth.scss';

let queryString = require('query-string');

//@todo - you were here figuring out what components you need for the various password reset stages

const ResetPassword = () => {

    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const authApi = new authAPI();

    /**
     * INITIAL COMPONENT STATE
     */
    let [componentState, setComponentState] = useState({
        token: parsed.token,
        user_name: '',
        password_change_success : false,
        password_change_failure: false
    });


    /**
     * INITIAL FORM VALUES
     */
    const [initialFormState, setInitialFormState] = useState({
        email_input: '' //we use state here as we update the email from an API call on load.
    });

    React.useEffect(() => {
        authApi.passwordResetFind({
            token: componentState.token
        }).then((authResponse) => {
            setInitialFormState({...initialFormState, email_input:authResponse.data.email});
        }).catch((error: any) => {
            setComponentState({
                ...componentState,
                password_change_failure:true
            })
        });
         // eslint-disable-next-line
    }, []);

    /**
     * FORM VALIDATION
     */
    const formValidation = Yup.object().shape({
        email_input: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password_input: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        confirm_password_input: Yup.string().when("password_input", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password_input")],
                "Both password need to be the same"
            ).required('Required')
        })
    });

    /**
     * FORM API SUBMIT
     */
    const handleResetPasswordFormSubmit = (fields: any) => {
        authApi.passwordReset({
            email: fields.email_input,
            password: fields.password_input,
            password_confirmation: fields.confirm_password_input,
            token: componentState.token
        }).then((authResponse) => {
            setComponentState({
                ...componentState,
                user_name: authResponse.data.user.name,
                password_change_success:true
            })
        }).catch((error: any) => {
            setComponentState({
                ...componentState,
                password_change_failure:true
            })
        });
    }

    /**
     * DOM
     */
    return (
        <React.Fragment>
            <Card className="centerCard authCard" variant="outlined">
            {!componentState.password_change_success && !componentState.password_change_failure ?
                <Formik
                    enableReinitialize={true}
                    initialValues={initialFormState}
                    validationSchema={formValidation}
                    onSubmit={handleResetPasswordFormSubmit}>
                    {({ isSubmitting }) => (
                        !isSubmitting ? <Form>
                            <CardContent>
                                <Field
                                    component={TextField}
                                    id="email_input"
                                    name="email_input"
                                    label="Email"
                                    type="email"
                                    autoComplete="current-email"
                                    variant="outlined"
                                />
                                <Field
                                    id="password_input"
                                    component={TextField}
                                    name="password_input"
                                    label="New Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                />
                                 <Field
                                    id="confirm_password_input"
                                    component={TextField}
                                    name="confirm_password_input"
                                    label="Confirm New Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="small" type="submit">Reset password</Button>
                                <Link to="/auth/login">back</Link>
                            </CardActions>
                        </Form>
                            :
                        <Box>
                            <Typography>Re-setting your password</Typography>
                            <br />
                            <LinearProgress />
                        </Box>
                    )}
                </Formik>
                : null }

                {componentState.password_change_success ? 
                <Box>
                <Typography>Thank you {componentState.user_name}, your password has been re-set.</Typography>
                </Box> : null}

                {componentState.password_change_failure ? 
                <Box>
                <Typography>Sorry, this password reset token is no longer valid.</Typography>
                </Box> : null}

            </Card>
        </React.Fragment>
    );
};

export default ResetPassword;