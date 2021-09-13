import React, {useState, useEffect} from "react";

import { useForm } from "react-hook-form";
//styles
import { Wrapper, Content } from './Form.styles.js'
import { useDocumentFetch } from '../../hooks/useDocumentFetch'

//other
import apisetting from "../../API.js";


const Form = (setFormCreate) => {

    const {getDataFromEditor} = useDocumentFetch(); /* hämtar  */
    
    
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => handleInput(data); // klar

    const [state, setState] = useState(''); 

    const handleInput = async (data) => {
        setState(data.docName)
    };

    useEffect(() => {
        if (state == "") {
            return
        }
        const documents = {
            createDocument: apisetting.createOneDocument(state)
        }
        alert(`Nytt dokument skapat med innehåller från editorn samt namn ${state}`)

        const timer= setTimeout(() => {
            setFormCreate(state)
        }, 100)
        
        return () => clearTimeout(timer)
    }, [setFormCreate, state])

    return (
        <Wrapper>
            <Content>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                <input defaultValue="" {...register("docName")} />
                    <input type = "submit"/>
                </fieldset>
                </form>
            </Content>
        </Wrapper>
        )        
}


export default Form
