import './button.styles.scss'
/*
default
inverted
google sign in
*/

export const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',

}
const Button = ({ children, buttonType, ...otherProps }) => {
    console.log("Children: ", children)
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button;