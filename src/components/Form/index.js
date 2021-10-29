import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import {Redirect} from "react-router-dom";
//styles
import { Wrapper, Content } from './Form.styles.js'
import Editor from "../Editor";
import FormAuthUsersToDoc from "../FormAuthUsersToDoc/index";
//other
import apisetting from "../../API.js";
import AppContext from '../authorized';

const initialState = {
    page: 0,
    fetchedAuthDoc: []

};

const Form = () => {
    const { handleSubmit } = useForm();
    const onChange = data => handleInput(data); // klar
    const [whatDocument, setWhatDocument] = useState(null); 
    const [theDocument, setTheDocument] = useState('');
    const [authDocuments, setAuthDocuments] = useState(initialState); 
    const myContext = useContext(AppContext);

    const handleInput = async (data) => {
        setWhatDocument(data)
    
    };


    useEffect(() => {
        const fetchDocument = async () => {
            if (whatDocument) {
                var query = `query 
                    { doc(docid: \"${whatDocument}\" ) 
                    { 
                        docname
                        text
                        allowed_user
                    } 
                }`
                let res = await apisetting.getByGraphQl(query)

                if (res.length !== 0) {
                    setTheDocument([
                        res.data.doc.text, 
                        res.data.doc.docname,
                        whatDocument, 
                        res.data.doc.allowed_user
                    ])
                }
            }
          }
           fetchDocument()
        }, [setWhatDocument, whatDocument])

        const handleAuthDocuments = async() => {
            const user = await myContext.user
            const authDocs = {
                fetchedAuthDoc: await apisetting.getAllAuthDocuments(user)
            }
            setAuthDocuments(prev => ({
                ...authDocs,
                fetchedAuthDoc:
                    [...authDocs.fetchedAuthDoc]
                
            }));
        }

        /* om man klickar på listan, uppdateras den. Dvs allt nytt som är skapat hämtas */
        const handleClick = async(e) => {
            handleAuthDocuments();
        }

        if (!myContext.authorized) {
            return <Redirect to="/login"/>;
        }
        return (
        <Wrapper>
            <Content>
            <h2>CKeditor</h2>
            <Editor 
                whatDocument={theDocument}
            />
            <fieldset>
                    <label >Välj en fil att uppdatera </label>
                        <select name="sss" data-testid="dropdown" onChange={(e) => {
                        handleSubmit(onChange(e.target.value))
                        }} onClick={(e) => {
                            handleClick(e.target.value)
                        }}>
                        <option value={''}>-- Eller välj en fil att uppdatera --</option>
                        
                        {authDocuments.fetchedAuthDoc.map(item => item.docs.map(element =>
                            <option 
                                key={element.docid} 
                                value={[element.docid]}>
                                {element.docname}
                            </option>))} 
                        </select>
                </fieldset>

                <FormAuthUsersToDoc whatDocument={theDocument}/>
            </Content>
        </Wrapper>
        )    
    
    
}


export default Form
