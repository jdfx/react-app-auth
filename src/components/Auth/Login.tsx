import React from 'react';
import { TextField, Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Auth.scss';

const Login = () => {
    return (
        <React.Fragment>
            <Card className="centerCard authCard" variant="outlined">
                <form action="#">
                    <CardContent>
                    <TextField
                        id="email-input"
                        name="email-input"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        variant="outlined"
                        />
                    <TextField
                        id="password-input"
                        name="password-input"
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
                </form>
            </Card>
        </React.Fragment>
    );
};

export default Login;