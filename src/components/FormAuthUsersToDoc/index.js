import React, {useState, useEffect} from "react";

import { useForm } from "react-hook-form";
import { useContext } from 'react';

//styles
import { Wrapper, Content } from './Form.styles.js'

//other
import apisetting from "../../API.js";
import AppContext from '../authorized';


const initialState = {
    oneDocument: ["null"]
};

/* skickar in whatDocument, som är det dokumentet som ska kunna redigeras i editorn */
const FormAuthUsersToDoc = (whatDocument) => {

    const { handleSubmit } = useForm();
    const onChange = data => handleInput(data); // klar
    const onSubmits = data => handleSubmits(data)
    const myContext = useContext(AppContext);
    const [state, setState] = useState(initialState); /* dekonstruera state */
    const [emailToAdd, setEmailToAdd] = useState(""); /* dekonstruera state */

    const handleInput = async (emailToAdd) => {
        setEmailToAdd(emailToAdd)
    };

    // vem får dela vilket dokument?, finns det risk för dubletter?
    const handleSubmits = async (event)  => {

        const token = await myContext.authorized;
        let email = whatDocument.whatDocument[3];
        email = email[0];
        const docid = whatDocument.whatDocument[2]

        if (email === emailToAdd) {
            alert("Du äger redan dokumentet")
        } else {
            alert("Delat")
            const res = await apisetting.updateUserAuthForDoc(email, docid, emailToAdd, token)
        }          
    }
 
    const fetchDocuments = async() => {
        let query = "{ users { email _id  } }";
        try {
            let res = await apisetting.getByGraphQl(query)
            const allDocuments = {             
                oneDocument: res.data.users
            }

            console.log(allDocuments.oneDocument)
            
            setState(prev => ({
                ...allDocuments,
                oneDocument:
                [...allDocuments.oneDocument]
            }));
        } catch (error) {
            console.log(error);
        }
    };

    //initial render 
    useEffect(() => {
        fetchDocuments();
    }, [])

    return (
    <Wrapper>
        <Content>
        <fieldset className = "register">
            <label> Välj användare som du vill dela dokumentets rättigheter med </label>
                <select name="bbb" data-testid="dropdown2" onChange={(e) => {
                handleSubmit(onChange(e.target.value))
                }}>
                    <option value={''}>-- Välj användare --</option>
                    {state.oneDocument.map(item => item.docs !== null ? 
                        <option 
                            key={item._id+1} 
                            value={[item.email]}>
                            {item.email}
                        </option>: console.log("hej"))}
                </select>

                <button onClick={onSubmits}>
                Dela
                </button>
            </fieldset> 
        </Content>
    </Wrapper>
    )    

}
export default FormAuthUsersToDoc
