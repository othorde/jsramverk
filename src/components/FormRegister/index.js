import React, {useState } from "react";

import {useHistory} from 'react-router-dom';

//styles
import { Wrapper, Content, Signup } from './Form.styles.js'

//other
import apisetting from "../../API.js";


const FormRegister = () => {
    const [inputs, setInputs] = useState({});
    let history = useHistory("")

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = async (event)  => {
        event.preventDefault();
        let res = await apisetting.createOneUser(inputs.name, inputs.username, inputs.psw)
        if (res === false) {
            alert("User already exists")
        } else if (res.data.msg === "Got a POST request, sending back 201 Created"){
            history.push("/docs");
        }
    }

    return (
        <Wrapper>
            <Content>
                 <h2> Registrera </h2>
                <Signup>
                    <form onSubmit={handleSubmit} className = "register">
                        <label>Enter email:
                        <input 
                            type="text" 
                            name="username"
                            required
                            value={inputs.username || ""} 
                            onChange={handleChange}
                        />
                        </label>
                        <label>Enter name:
                        <input 
                            type="text" 
                            name="name"
                            required
                            value={inputs.name || ""} 
                            onChange={handleChange}
                        />
                        </label>
                        <label>Enter password:
                            (Password can be anything)
                            <input 
                            type="text"
                            name="psw"
                            required
                            value={inputs.psw || ""} 
                            onChange={handleChange}
                            />
                            </label>
                    
                        <input type="submit" value="Registrera" />
 
                    </form>

                </Signup>
                <form action="/~olto20/editor/#/login" >
                <input type="submit" value="Gå till logga-in sidan" />
                </form>
            </Content>

        </Wrapper>
        )        
}


export default FormRegister
