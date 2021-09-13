import React, {useState, useEffect} from "react";

import { useForm } from "react-hook-form";
//styles
import { Wrapper, Content } from './Form.styles.js'
import { useDocumentFetch } from '../../hooks/useDocumentFetch'

//other
import apisetting from "../../API.js";


const Form = ({editorData}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => useDocumentFetch.handleInput(data); // klar
    const onChange = data => handleChange(data);
    const [err, setErr] = useState(false);

    const {state } = useDocumentFetch(); /* hämtar  */
    const [HandleInput, setHandleInput] = useState(''); 
    const [HandleChangeInput, setChangeInput] = useState(''); 

/* 

    const handleInput = async (data) => {
        console.log(data.docName)
        setHandleInput(preValue => data)
        try {
            setErr(false);

            const documents = {
                createDocument: apisetting.createOneDocument(HandleInput.docName)
            }
            alert("Skapad")
        } catch (err) {
            setErr(true);
        }

    };
 */


    function handleChange(data) {
        setChangeInput(preValue => data)
        alert("Dokument hämtat")
        //console.log(HandleChangeInput)
/*         let hej = apisetting.getOneDocument(HandleChangeInput)
        console.log(hej) */
    }
    
    //console.log("HANDLE INPUT", HandleInput)
    return (
        
        <Wrapper>
            <Content>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                <input defaultValue="test" {...register("docName")} />
                    <input type = "submit"/>
                </fieldset>

                <fieldset>
                    <label>
                        <p>Apples</p>
                        <select name="" onChange={(e) => {

                        handleSubmit(onChange(e.target.value))
                        }}>
                        <option value={''}>-- Eller välj en fil att uppdatera --</option>
                        {state.oneDocument.map(item => (<option key={item._id} value={[item._id]} >{item.name}</option>))}

                            </select>
                        </label>
                </fieldset>
                </form>
            </Content>
        </Wrapper>
        )        
}


export default Form
