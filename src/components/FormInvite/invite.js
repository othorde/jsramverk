import React, {useState, useContext} from "react";
import apisetting from "../../API.js";
import AppContext from '../authorized';

const FormInvite = (editorContent) => {
    const myContext = useContext(AppContext);
    const [inputs, setInputs] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event)  => {
        const user = myContext.user;
        const token = myContext.tokenWhenLoggedIn;
        let res = await apisetting.inviteUser2Doc(inputs.email, user, token);
        let docid = editorContent; 
        console.log("docid", docid);
        console.log(res)
        if (res.data.mail === "Accepted") {
            if (editorContent.editorContent !== "") {
                let docid = editorContent.editorContent[1];
    
                let addUserToDoc = await apisetting.updateUserAuthForDoc(user, docid, inputs.email, token)
                console.log(addUserToDoc)
                if (addUserToDoc.data.msg) {
                    alert(`${inputs.email} är nu inbjuden och auktoriserad till att redigera dokument`)
                } 
            } else {
                alert("hmm, något gick fel. Testa att uppdatera dokumentet")
            }
        } else {
            alert("Det gick ej att bjuda in, du måste först spara dokument eller använda ett befintligt")
        } 
        event.preventDefault();
    }

    return (
        <>
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
        </>

        )        
}
export default FormInvite
