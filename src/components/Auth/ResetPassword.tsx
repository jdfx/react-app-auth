import React from 'react';
import { TextField, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Auth.scss';

const ResetPassword = () => {
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
                    </CardContent>
                    <CardActions>
                        <Button size="small" type="submit">Reset password</Button>
                        <Link to="/auth/login">back</Link>
                    </CardActions>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default ResetPassword;