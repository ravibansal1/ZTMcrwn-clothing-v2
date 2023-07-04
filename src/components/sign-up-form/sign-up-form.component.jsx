import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)

    const { displayName, email, password, confirmPassword } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            try {
                console.log("Good the passwords match")
                const { user } = await createAuthUserWithEmailAndPassword(email, password)
                // console.log(user.user.displayName, "...created")
                await createUserDocumentFromAuth(user, { displayName });
                resetFormFields();
            }
            catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('cannot create user, email already in use')
                } else
                    console.error(error);
            }
        } else {
            console.log("Passwords do not match");
            return;
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput label="Display Name" required type="text" onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit" >Sign up</Button>
            </form>
        </div >
    )
}
export default SignUpForm;