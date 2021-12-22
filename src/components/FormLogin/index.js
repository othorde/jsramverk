import React, {useState } from "react";
import {useHistory} from 'react-router-dom';
import { useContext } from 'react';

//styles
import { Wrapper, Content, Signup } from './Form.styles.js'

//other
import apisetting from "../../API.js";
import AppContext from '../authorized';


const FormLogin = () => {
    const [inputs, setInputs] = useState({});
    let history = useHistory("")
    const myContext = useContext(AppContext);

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))
    }

      const handleSubmit = async (event)  => {
        event.preventDefault();

        try {
            let res = await apisetting.findUser(inputs.username, inputs.psw)
            if (res.data.msg === true) {
                await myContext.setTokenForUser(res.data.token);
                await myContext.authorizedOrNot(true);
                await myContext.setUserLoggedIn(inputs.username);
                history.push("/docs");
            }
        } catch (typeError) {
            alert("Wrong password or username")
        }
        
    }

    return (
        <Wrapper>
            <Content>
                <h2> Logga in </h2>
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
                        <label>Enter password:
                            <input 
                            type="password"
                            name="psw"
                            required
                            value={inputs.psw || ""} 
                            onChange={handleChange}
                            />
                            </label>
                            <input type="submit" value="Logga in" />
                    </form>
                </Signup>
                <form action="/~olto20/editor/#/registrera" > {/* /~olto20/editor/#/registrera */}
                <input type="submit" value="Gå till registrera" />
                </form>
            </Content>
        </Wrapper>
        )        
}


export default FormLogin
