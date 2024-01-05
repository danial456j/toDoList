import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null);

    const [user,setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    function handleChange(event){
        const {name, value} = event.target;

        setUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function onSubmitForm(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            if (response.ok) {
                setSuccessMessage("Signup successful! Redirecting...");
                // If the response is successful, navigate to "/"
                setTimeout(() => {
                    navigate("/");
                }, 2000); // 2000 milliseconds (2 seconds)
            } else {
                console.error("Signup failed");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="signup template d-flex justify-content-center align-items-center">
                <form action="/signup" onSubmit={onSubmitForm} className="form_container p-5 rounded">
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <input type="text" name="fname" placeholder="Enter First Name" value={user.fname} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <input type="text" name="lname" placeholder="Enter Last Name" value={user.lname} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <input type="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <input type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleChange} required />
                    </div>

                    
                    <div className="mt-2">
                        <button type="submit">Sign Up</button>
                    </div>
                    {successMessage && <p className="text-center mt-2">{successMessage}</p>}
                    <p className="text-end mt-2">
                        Already Registerd<Link to="/" className="ms-2">Log in</Link>
                    </p>
                </form>
        </div>
    )
}

export default Signup;