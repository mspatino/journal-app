import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle , logoutFirebase} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";

export const chekingAuthentication = ( email , password) => {

    return async ( dispatch ) => {
        dispatch ( checkingCredentials() );
    }


}

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {
        dispatch ( checkingCredentials() );
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch( logout(result.errorMessage));

        dispatch( login(result));        

        console.log({result});
    }


}

export const startCreatingUserWithEmailPassword = ({email , password , displayName}) => {

    return async ( dispatch ) => {
        dispatch ( checkingCredentials() );

        const {ok,photoURL,uid,errorMessage} = await registerUserWithEmailPassword({email,password,displayName});

        // console.log(result);
        if (!ok) return dispatch( logout({errorMessage}));

        dispatch( login({uid,displayName,photoURL,email}));
    }
}


export const startLoginWithEmailPassword = ( { email , password } ) => {
    
    return async (dispatch) => {
        
        dispatch ( checkingCredentials() );

        const result = await loginWithEmailPassword({email,password});
        
        if (!result.ok) return dispatch( logout(  result  ));

        dispatch( login(result));

    }

}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );

    }
}


