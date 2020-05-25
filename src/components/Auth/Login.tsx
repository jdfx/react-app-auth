import React from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box, LinearProgress } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';
import { authStoreContext } from '../../store/Auth/AuthStore';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import './Auth.scss';

const Login = () => {

    let authStore = React.useContext(authStoreContext);
    let { dispatch } = authStore;

    /**
     * INITIAL FORM VALUES
     */
    const initialFormValues = {
        email_input: '',
        password_input: ''
    };

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
            .required('Required')
    });

    /**
     * FORM API SUBMIT
     */
    const authApi = new authAPI();
    const handleLoginFormSubmit = (fields: any) => {

            authApi.login({
                email: fields.email_input,
                password: fields.password_input
            }).then((authResponse: any) => {

                dispatch({
                    type: 'LOGIN',
                    payload: authResponse.data
                });

            }).catch((error: any) => {
                console.log(error);
                //@todo - add a notify package
            });
    }

    let history = useHistory();
    React.useEffect(() => {
        switch (authStore.state.role) {
            case 0: history.push('/admin/dash'); break;
            case 1: history.push('/user/dash'); break;
        }
    }, [authStore.state.role, history]);

    return (
        <React.Fragment>
            <Card className="centerCard authCard" variant="outlined">
                <Box>
                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={formValidation}
                        onSubmit={handleLoginFormSubmit}>
                        {({ isSubmitting }) => (
                            !isSubmitting ? <Form>
                                <CardContent>
                                    <Field
                                        id="email_input"
                                        component={TextField}
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
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button size="small" type="submit">Login</Button>
                                    <Typography>don't have a login? <Link to="/auth/register">register</Link></Typography>
                                    <Typography>have you <Link to="/auth/reset">forgotten your password?</Link></Typography>
                                </CardActions>
                            </Form>
                                :
                            <Box>
                                <Typography>Logging in...</Typography>
                                <br />
                                <LinearProgress /> 
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Login
