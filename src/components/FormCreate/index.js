import React, {useState, useEffect} from "react";

import { useForm } from "react-hook-form";
//styles
import { Wrapper, Content } from './Form.styles.js'
import { useDocumentFetch } from '../../hooks/useDocumentFetch'

//other
import apisetting from "../../API.js";


const FormCreate = (editorContent) => {

    
    
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => handleInput(data); // klar
    //const onUpdate = data => handleUpdate(data); // klar

    const [state, setState] = useState(editorContent); 
    const handleInput = async (data) => {

        const body = editorContent.editorContent[0]
        const id = editorContent.editorContent[1]
            alert("Dokument skapat");
            let res = await apisetting.createOneDocument(data.docName, body)
    }

    const handleUpdate= async () => {

        const body = editorContent.editorContent[0];
        const id = editorContent.editorContent[1];
        let res = await apisetting.updateOneDocument(id, body)

        return res;

    }





    

    useEffect(() => {

        const createDocument = async () => {

            /* jag vill att whatDokument ska hämta ett nytt dokument baseras på datan som skickas in genom handleInput alltså vilket ID */
            //let res = await apisetting.createOneDocument(name, body)
            //console.log("WHÁT HEJ", hej[0].body)
            //setTheDocument(res[0].body)
          }
          createDocument()
           /* jag vill att whatDokument ska hämta ett nytt dokument baseras på datan som skickas in genom handleInput alltså vilket ID */

        }, [setState, state])

    return (
        <Wrapper>
            <Content>

            <form onSubmit={handleSubmit(onSubmit)}>

                <fieldset>
                <p>Döp filen och spara</p>
                <input type = "submit" value= "Spara som"/>
                <input defaultValue="" {...register("docName")} />
                </fieldset>
                </form>

                <form onSubmit={handleSubmit(handleUpdate)}>
                <fieldset>
                <p>Uppdatera</p>
                <input type = "submit" value= "Uppdatera" {...register("uppdatera")}/>
                </fieldset>
                </form>

            </Content>
        </Wrapper>
        )        
}


export default FormCreate
