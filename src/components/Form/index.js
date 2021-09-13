import React, {useState, useEffect} from "react";

import { useForm } from "react-hook-form";
//styles
import { Wrapper, Content } from './Form.styles.js'
import { useDocumentFetch } from '../../hooks/useDocumentFetch'
import Editor from "../Editor";

//other
import apisetting from "../../API.js";


const Form = (setFormCreate) => {

    const {state, getDataFromEditor} = useDocumentFetch(); /* hämtar  */
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => handleInput(data); // klar
    const onChange = data => handleInput(data); // klar

    const [whatDocument, setWhatDocument] = useState(''); 
    const [theDocument, setTheDocument] = useState(''); 

    const handleInput = async (data) => {
        setWhatDocument(data)
    };

    useEffect(() => {

        const fetchDocument = async () => {

            /* jag vill att whatDokument ska hämta ett nytt dokument baseras på datan som skickas in genom handleInput alltså vilket ID */
            let res = await apisetting.getSpecificDocument(whatDocument)
            
            setTheDocument([res[0].body, res[0].name, res[0]._id])

          }
          fetchDocument()
           /* jag vill att whatDokument ska hämta ett nytt dokument baseras på datan som skickas in genom handleInput alltså vilket ID */

        }, [setWhatDocument, whatDocument])

    return (
        <Wrapper>
            <Content>
            <Editor 
                whatDocument={theDocument}
            />
            <fieldset>
                    <label>
                        <p>Välj en fil att uppdatera</p>
                        <select name="sss" onChange={(e) => {

                        handleSubmit(onChange(e.target.value))
                        }}>
                        <option value={''}>-- Eller välj en fil att uppdatera --</option>
                        {state.oneDocument.map(item => (<option key={item._id} value={[item._id]} >{item.name}</option>))}

                            </select>
                        </label>
                </fieldset>

     {/*        <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                <input defaultValue="" {...register("docName")} />
                    <input type = "submit"/>
                </fieldset>
                </form> */}
            </Content>
        </Wrapper>
        )        
}


export default Form
