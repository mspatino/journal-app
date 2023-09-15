import { createUserWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
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


export const registerUserWithEmailPassword = async ({ email, password , displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const { uid, photoURL } = resp.user;
        console.log(resp);
        //TODO: actualizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser,{displayName});


        return {
            ok: true,
            uid, displayName,photoURL,email
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({email,password}) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth,email,password);
        const {uid,displayName,photoURL} = resp.user;
        console.log(uid,displayName,photoURL);
        return {
            ok: true,
            uid, displayName,photoURL
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }


}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}