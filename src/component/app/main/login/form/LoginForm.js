import {getStringsByLocale} from "../../../../../resources/languages";
import {connect} from "react-redux";
import styles from "./LoginForm.module.css";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {CustomInputField, useStyles} from "../../../helper/input/CustomInput";


function LoginForm(props) {

    const classes = useStyles();

    let strings = getStringsByLocale(props.locale);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {handleSubmit, register, errors} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onCLick = () => {
        setLogin(document.getElementById("input-login").value)
        setPassword(document.getElementById("input-password").value)
    }
    const onSubmit = values => {
        console.log(values);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.signInTitle}>{strings.signIn}</div>
            <div className={styles.fields}>
                <CustomInputField
                    name="login"
                    variant="filled"
                    id="input-login"
                    label={strings.loginFormLogin}
                    type="text"
                    helperText={errors.login?.message}
                    className={classes.margin}
                    inputProps={{
                        maxLength: 30,
                    }}
                    inputRef={register({
                        maxLength: 30,
                        required: strings.validationLoginRequired,
                        minLength: {
                            value: 2,
                            message: strings.validationLoginLength
                        },
                    })}
                    autoComplete='login'
                    error={errors.login}
                />

                <CustomInputField
                    name="password"
                    variant="filled"
                    id="input-password"
                    label={strings.loginFormPassword}
                    helperText={errors.password?.message}
                    maxLength={2}
                    className={classes.margin}
                    inputProps={{
                        maxLength: 30,
                    }}
                    autoComplete='password'
                    error={errors.password}
                    inputRef={register({
                        maxLength: 30,
                        required: strings.validationPasswordRequired,
                        minLength: {
                            value: 2,
                            message: strings.validationPasswordLength
                        },
                    })}
                />
            </div>
            <button type='submit' onClick={() => onCLick()} className={styles.button}>{strings.continueOn}</button>
        </form>
    );
}

const mapStateToProps = state => ({
    locale: state.language.locale
})

export default connect(mapStateToProps)(LoginForm);
