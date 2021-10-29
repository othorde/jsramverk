import React, {useState, useEffect, useContext} from "react";
import { useForm } from "react-hook-form";
//styles
import { Wrapper, Content } from './Form.styles.js'
//other
import apisetting from "../../API.js";
import AppContext from '../authorized';


const FormCreate = (editorContent) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => handleInput(data);
    const myContext = useContext(AppContext);
    const [state, setState] = useState(editorContent); 

    const handleInput = async (data) => {

        let codeMode = "";
        const body = editorContent.editorContent[0];
        const user = myContext.user;
        const token = myContext.tokenWhenLoggedIn;
        if (editorContent.editorContent[3] !== undefined) {
            codeMode = editorContent.editorContent[3];
        }

        let res = await apisetting.addOneDocument(data.docName, body, user, token, codeMode)
        if(res.data.msg === true) {
            alert("Sparat")
        } else {
            alert("Något gick fel")
        }

    }
    
    const handleUpdate = async () => {
        const body = editorContent.editorContent[0];
        const id = editorContent.editorContent[1];
        const token = myContext.tokenWhenLoggedIn;

        let res = await apisetting.updateOneDocument(id, body, token)
        if(res.data.msg) {
            alert("Uppdaterat")
        }
        return res;
    }

    useEffect(() => {
        }, [setState, state])

    return (
        <Wrapper>
            <Content>
            <form onSubmit={handleSubmit(handleUpdate)} testid="formtest" className = "update">
                <input
                    type = "submit" 
                    value= "Uppdatera" {...register("uppdatera")}
                />
            </form>
            <form testid="createtest" onSubmit={handleSubmit(onSubmit)} className = "spara">
                <input 
                    type = "submit" 
                    value= "Spara som"/>
                <input 
                    defaultValue="" {...register("docName")} />
            </form>
                

            </Content>
        </Wrapper>
        )        
}


export default FormCreate
