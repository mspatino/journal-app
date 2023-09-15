import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google, Start } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'




export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );  

  const isAuthenticated = useMemo( () => status === 'checking' ,[status]);

  const dispatch = useDispatch();  

  const { email , password , onInputChange} = useForm({
    email: '',
    password: '',
  });
  
  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log({ email , password}); 
    dispatch( startLoginWithEmailPassword( { email , password } ) );  
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn());  
  }


  return (
    <AuthLayout title='Login'>
        <form onSubmit={ onSubmit }>
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2}}>
                    <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="no-responder@gmail.com"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
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
                    fullWidth
                    />
                </Grid>
                <Grid container display={ !!errorMessage ? '' : 'none'} sx={{mt:1,mb:1}}>
                <Grid item xs={ 12 }>
                        <Alert severity='error'>
                            { errorMessage }
                        </Alert>
                    </Grid>
                </Grid>
                    <Grid 
                    container 
                    spacing={ 2 } 
                    sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                            disabled={ isAuthenticated }
                            type='submit' 
                            variant='contained' 
                            fullWidth>
                             Login
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                            disabled={ isAuthenticated }
                            onClick={ onGoogleSignIn } 
                            variant='contained' 
                            fullWidth>
                             <Google />
                             <Typography sx={{ ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={ RouterLink } color='inherit' to="/auth/register">
                        Crear una cuenta
                        </Link>
                    </Grid>

            </Grid>

        </form>
    </AuthLayout>








  )
}
