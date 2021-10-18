import React, { useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import '../login.css';

import { Context } from '../store' 
import { useDirectus } from '../DirectusProvider'

const renderFooter = (onClick) => {
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={()=>onClick(false)} className="p-button-text" />
         </div>
    );
}
// https://primefaces.org/primereact/showcase/#/reactfinalform
export const Login = (props) => {
    const [state, dispatch] = useContext(Context)
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const { directus } = useDirectus();
    const [authError, setAuthError] = useState(false)
    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        const login = async()=>{
            try{
                await directus.auth.login({
                    email: data.email,
                    password: data.password,
                });
                const userInfo = await directus.users.me.read({
                    fields: ['*', 'role.id', 'role.name'],
               }); 
                dispatch({type: 'SET_USER_LOGGED', user: userInfo})
                props.history.push('/')
            }
            catch(error){
                // TODO: Check and handle error 
                setAuthError(true)
            }
            
        }
        login()
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    console.log('Form')
    return (
        <div className="form-demo">
            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">Login</h5>
                    <Form onSubmit={onSubmit} initialValues={{ email: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="email" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="p-field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="p-mt-2" />                            
                        </form>
                    )} />                   
                </div>
            </div>
            <Dialog header="Error de autenticación" visible={authError} style={{ width: '50vw' }} footer={renderFooter(setAuthError)} onHide={() => setAuthError(false)}>
            <p>Usuario y/o contraseña incorrectos.</p>
        </Dialog>
        </div>
    );
}
export default Login