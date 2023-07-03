import { useEffect } from 'react';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { getRedirectResult } from 'firebase/auth';

const SignIn = () => {

    useEffect(async () => {
        const response = await getRedirectResult(auth);
        console.log(response);
    }, [])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with Google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button>
        </div>
    )
}

export default SignIn;