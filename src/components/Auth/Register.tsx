import React from 'react';
import { TextField, Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';
import { AuthContext } from '../../context/Auth/AuthContext';

import './Auth.scss';

const Register = () => {

    const { dispatch } = React.useContext(AuthContext);

    /**
     * FORM STATE
     */
    const [registerFormData, setRegisterFormData] = React.useState({
        name_input: null,
        email_input: null,
        password_input: null,
        confirm_password_input: null,
        isSubmitting: false,
        errorMessage: null
    });

    const handleRegisterFormInputChange = (event : any) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name] : event.target.value
        });
    };

    /**
     * FOR API SUBMIT
     */
    const authApi = new authAPI();
    const handleRegisterFormSubmit = (event : any) => {

        event.preventDefault();
        setRegisterFormData({
            ...registerFormData,
            isSubmitting: true
        });

        authApi.register({
            name: registerFormData.name_input,
            email: registerFormData.email_input,
            password: registerFormData.password_input,
            c_password: registerFormData.confirm_password_input
        }).then((authResponse : any) => {

            dispatch({
                type : 'REGISTER',
                payload : authResponse.data.success
            });

            setRegisterFormData({
                ...registerFormData,
                isSubmitting: false
            });

        }).catch((error : any) => {

            setRegisterFormData({
                ...registerFormData,
                errorMessage: error
            });

        });
    }

    return (
        <React.Fragment>
        <Card className="centerCard authCard" variant="outlined">
            <form onSubmit={handleRegisterFormSubmit}>
                <CardContent>
                <TextField
                    id="name_input"
                    name="name_input"
                    label="Name"
                    type="text"
                    autoComplete="current-name"
                    variant="outlined"
                    onChange={handleRegisterFormInputChange}
                    />
                <TextField
                    id="email_input"
                    name="email_input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="outlined"
                    onChange={handleRegisterFormInputChange}
                    />
                <TextField
                    id="password_input"
                    name="password_input"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={handleRegisterFormInputChange}
                    />
                <TextField
                    id="confirm_password_input"
                    name="confirm_password_input"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    onChange={handleRegisterFormInputChange}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" type="submit">Register</Button>
                    <Typography>already have an account? <Link to="/auth/login">login</Link></Typography>
                </CardActions>
            </form>
        </Card>
    </React.Fragment>
    );
};

export default Register;