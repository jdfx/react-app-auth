import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box, LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import authAPI from '../../api/auth.api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import './Auth.scss';

//@todo - you were here figuring out what components you need for the various password reset stages

const RequestResetPassword = () => {

    /**
     * INITIAL COMPONENT STATE
     */
    let [componentState, setComponentState] = useState({
        request_password_change_success: false,
        request_password_change_failure: false
    });

    /**
     * INITIAL FORM VALUES
     */
    const initialFormValues = {
        email_input: ''
    };

    /**
     * FORM VALIDATION
     */
    const formValidation = Yup.object().shape({
        email_input: Yup.string()
            .email('Invalid email address')
    });

    /**
     * FORM API SUBMIT
     */
    const authApi = new authAPI();
    const handleRequestResetPasswordFormSubmit = (fields: any) => {
        authApi.passwordResetRequest({
            email: fields.email_input,
            reset_url: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/reset/token`
        }).then(() => {
            setComponentState({
                ...componentState,
                request_password_change_success : true
            })
        }).catch((error: any) => {
            setComponentState({
                ...componentState,
                request_password_change_failure : true
            })
        });
    }

    return (
        <React.Fragment>
            <Card className="centerCard authCard" variant="outlined">
                {!componentState.request_password_change_success && !componentState.request_password_change_failure ?
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={formValidation}
                    onSubmit={handleRequestResetPasswordFormSubmit}>
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
                            </CardContent>
                            <CardActions>
                                <Button size="small" type="submit">Reset password</Button>
                                <Link to="/auth/login">back</Link>
                            </CardActions>
                        </Form>
                            :
                            <Box>
                                <Typography>Requesting password reset...</Typography>
                                <br/>
                                <LinearProgress />
                            </Box>
                    )}
                </Formik> : null }
                {componentState.request_password_change_success ?
                <Box>
                    <Typography>Please check your email for a password re-set link.</Typography>
                </Box> : null }

                {componentState.request_password_change_failure ?
                <Box>
                    <Typography>Sorry, there was an error finding your account.</Typography>
                </Box> : null }

            </Card>

        </React.Fragment>
    );
};

export default RequestResetPassword;