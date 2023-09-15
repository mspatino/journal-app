import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const { state, errorMessage } = useSelector( state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const [formSubmitted, setFormSubmitted] = useState(false);

    const formData = {
        email: '',
        password: '',
        displayName: ''
        };

    const formValidators = {
            email: [ (value) => value.includes('@'), 'El correo debe tener un @.' ],
            password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 caracteres.' ],
            displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.' ],
        };
    

    const { email , password , displayName, formState, onInputChange,
        emailValid , passwordValid , displayNameValid, isFormValid,form} = useForm(formData,formValidators);

    console.log(emailValid);    

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);    

        if ( !isFormValid ) return;
        // console.log(formState);
        dispatch( startCreatingUserWithEmailPassword(formState));
    }
        {/* var token_null = null;
        console.log( 'token_null   =', token_null );   // null
        console.log( '!token_null  =', !token_null );   // true
        console.log( '!!token_null =', !!token_null );  // false */}


  return (
    <AuthLayout title='Crear cuenta'>
        <h1>FormValid: {isFormValid ? 'Es válido' : 'No válido'} </h1>

    <form onSubmit={ onSubmit }>
        <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="John Doe"
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted}
                helperText={displayNameValid}
                fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
                    <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="no-responder@gmail.com"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    error={!!emailValid && formSubmitted}
                    helperText={emailValid}
                    fullWidth
                    />
                </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
                fullWidth
                />
            </Grid>
                <Grid 
                container 
                spacing={ 2 } 
                sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>
                            { errorMessage }
                        </Alert>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button 
                        disabled={ isCheckingAuthentication }
                        type="submit"
                        variant='contained' 
                        fullWidth>
                         Crear cuenta
                        </Button>
                    </Grid>
                    
                </Grid>

                <Grid container direction='row' justifyContent='end'>
                    <Typography sx={{ mr: 1}}>¿Ya tienes cuenta?</Typography>
                    <Link component={ RouterLink } color='inherit' to="/auth/login">
                    Ingresar
                    </Link>
                </Grid>

        </Grid>

    </form>
</AuthLayout>
  )
}
