import React, {useState, useContext} from "react";
import apisetting from "../../API.js";
import AppContext from '../authorized';
import { Wrapper, Content } from './Form.styles.js'

import { useForm } from "react-hook-form";
const FormInvite = (editorContent) => {
    const myContext = useContext(AppContext);
    const [inputs, setInputs] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event)  => {
        const user = await myContext.user;
        const token = await myContext.tokenWhenLoggedIn;
        
        if(user.length > 1 && token.length > 1) {
            let res = await apisetting.inviteUser2Doc(inputs.email, user, token);
            if (res.data.mail === "Accepted") {
                if (editorContent.editorContent !== "") {
                    let docid = editorContent.editorContent[1];
        
                    let addUserToDoc = await apisetting.updateUserAuthForDoc(user, docid, inputs.email, token)
                    if (addUserToDoc.data.msg) {
                        alert(`${inputs.email} är nu inbjuden och auktoriserad till att redigera dokument`)
                    } else {
                        alert(`${inputs.email} är nu inbjuden`)
                    }
                } else {
                    alert("hmm, något gick fel. Testa att uppdatera dokumentet")
                }
            } else {
                alert("Det gick ej att bjuda in, du måste först spara dokument eller använda ett befintligt")
            } 
        } else { 
            alert("Något gick snett.. är dokumentet tomt eller har du glömt spara?")
        }
    }

    return (
        <Wrapper>
            <Content>
                <form onSubmit={handleSubmit} className = "register">
                <label>Enter email:
                <input 
                    type="text" 
                    name="email"
                    required
                    value={inputs.name} 
                    onChange={handleChange}
                />
                </label>
                <input type="submit" value="Skicka inbjudan till att redigera dokument" />
            </form> 
           </Content>

        </Wrapper>
        )        
}
export default FormInvite
