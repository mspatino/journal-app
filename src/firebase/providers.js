import {  GoogleAuthProvider , signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';



//creamos una instancia de GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {

      const result = await signInWithPopup(FirebaseAuth,googleProvider);
      //const credentials = GoogleAuthProvider.credentialFromResult(result);
      //console.log({credentials});
      const {displayName,uid,photoURL,email} = result.user;
    //   console.log({user});
    return {
        ok: true,
        //user info
        displayName,uid,photoURL,email
    }
        
    } catch (error) {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,

        }
    }

}