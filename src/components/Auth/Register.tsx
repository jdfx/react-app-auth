import React from 'react';
import { Button, Card, CardContent, CardActions, Typography, LinearProgress, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';
import { authStoreContext } from '../../store/Auth/AuthStore';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import './Auth.scss';

const Register = () => {

    const authStore = React.useContext(authStoreContext);
    const { dispatch } = authStore;

    /**
     * INITIAL FORM VALUES
     */
    const initialFormValues = {
        name_input: '',
        email_input: '',
        password_input: '',
        confirm_password_input: ''
    };

    /**
     * FORM VALIDATION
     */
    const formValidation = Yup.object().shape({
        name_input: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(3, 'Must be 3 characters or more')
            .required('Required'),
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
            )
            .required('Required')
          })
    });

    /**
     * FOR API SUBMIT
     */
    const authApi = new authAPI();
    const handleRegisterFormSubmit = (fields: any) => {

        authApi.register({
            name: fields.name_input,
            email: fields.email_input,
            password: fields.password_input,
            c_password: fields.confirm_password_input
        }).then((authResponse: any) => {

            dispatch({
                type: 'REGISTER',
                payload: authResponse.data
            });

        }).catch((error: any) => {
            //@todo - add a notify package
        });
    }

    return (
        <React.Fragment>
                    <Card className="centerCard authCard" variant="outlined">
                        {!authStore.registered ? <Box>
                            <Formik
                                initialValues={initialFormValues}
                                validationSchema={formValidation}
                                onSubmit={handleRegisterFormSubmit}>
                                {({isSubmitting}) => (
                                    <Form>
                                        <CardContent>
                                            <Field
                                                id="name_input"
                                                component={TextField}
                                                name="name_input"
                                                label="Name"
                                                type="text"
                                                autoComplete="current-name"
                                                variant="outlined"
                                            />
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
                                                variant="outlined"
                                            />
                                            <Field
                                                id="confirm_password_input"
                                                component={TextField}
                                                name="confirm_password_input"
                                                label="Confirm Password"
                                                type="password"
                                                variant="outlined"
                                            />
                                        </CardContent>
                                        <CardActions>
                                            {isSubmitting && <LinearProgress />}<br/>
                                            <Button size="small" type="submit">Register</Button>
                                            <Typography>already have an account? <Link to="/auth/login">login</Link></Typography>
                                        </CardActions>
                                    </Form>
                                )}
                            </Formik>
                        </Box> :
                        <Box>
                            <Typography>Thank you, please check your email.</Typography>
                        </Box> }
                    </Card>
        </React.Fragment>
    );
};

export default Register;