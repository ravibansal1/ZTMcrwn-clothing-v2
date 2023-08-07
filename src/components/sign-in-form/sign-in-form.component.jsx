import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword
}
    from '../../utils/firebase/firebase.utils'
import { useState } from 'react';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)

    const { email, password } = formFields;

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password)
            // console.log(user.user.displayName, "...created")
            resetFormFields();
            console.log("Logged in user: ", user.email)
        }
        catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                alert('Password incorrect, or username not found')
            } else
                console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit" >Sign in</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;