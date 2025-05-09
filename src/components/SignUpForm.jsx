import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import User from './User';
import { UserContext } from '../context/UserContext';

function SignUpForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState('');
    const [users, setUsers] = useContext(UserContext)

    const handleChanges = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.password.length < 8) {
            setError("Password must be 8 characters long")
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Password and confirm Password must same")
            return;
        }

        if (!/[!@#$%^&*()_+".<>]/.test(formData.password)) {
            setError("Password must contain any special character")
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            setError("Password must contains any capital letter ")
            return;
        }

        setUsers((prevUsers) => [
            ...prevUsers, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }
        ])

        setError('')
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })



        toast.success('Login Successful', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            <div className="form-container">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChanges}
                        required
                        name='name'
                        placeholder="Enter Name here"
                        className="input-field"
                    />
                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChanges}
                        required
                        name='email'
                        placeholder="Enter Your Email"
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChanges}
                        required
                        name='password'
                        placeholder="Enter Password"
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChanges}
                        required
                        name='confirmPassword'
                        placeholder="Confirm Password"
                        className="input-field"
                    />

                    {error && (
                        <p style={{
                            color: "red",
                            fontSize: "0.8em",
                            padding: "0.6em 0.5em",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>{error}</p>
                    )}

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
                <p className="terms">
                    By registering, you agree to our Terms & Conditions and Privacy Policy.
                </p>



                <ToastContainer>

                </ToastContainer>
            </div>
            <div>
                {users.map((elem, idx) => {
                    return <User key={idx} elem={elem} />
                })}
            </div>
        </>
    );
}

export default SignUpForm;
