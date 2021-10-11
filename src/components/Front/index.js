import React from "react";

//styles
import { Wrapper, Content, Login, Signup } from './Form.styles.js'
//other

    const LoginOrRegister = () => {
    
        return (
            <Wrapper>
                <Content>
                <h2> Välkommen! </h2>
                        Logga in eller registrera dig för att skapa och dela dokument med andra användare!
                    <Signup>

                        <form action="/~olto20/editor/#/registrera" >
                            <input type="submit" value="Registrera" />
                        </form>

                    </Signup>
                    <Login>                       
                        <form action="/~olto20/editor/#/login" >
                            <input type="submit" value="Logga in" />
                        </form>
                        </Login>
                </Content>
            </Wrapper>
            )        
    }
    

export default LoginOrRegister

