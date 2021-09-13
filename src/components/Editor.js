import React, {useState, useEffect} from "react";
//Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Config 

//Components

import FormCreate from "./FormCreate";
//Hook

import { useDocumentFetch } from "../hooks/useDocumentFetch";

const Editor = (theDocument) => {

    //const {setDataFromEditor} = useDocumentFetch(); /* hämtar  */
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {

        
        }, [editorContent, setEditorContent])

    let doc = theDocument.whatDocument;

    return (
    <>
    {/* KANSKE MÅSTE HA DIVS HÄR */}
    <h2> {doc[1]}</h2>
    <CKEditor
        editor={ ClassicEditor }
        data={ doc[0] }
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
        } }
        onChange={ ( event, editor ) => {
            /* const data = editor.getData(); */
            // den jag tidigare använde var setDatas(editor.getData())
            setEditorContent([editor.getData(), doc[2]])
            //editor.setData("editorDocument")
            //setDataFromEditor(editor.getData())

        } }
        onBlur={ ( event, editor ) => {
        } }
        onFocus={ ( event, editor ) => {
        } }
    />
    <FormCreate editorContent={editorContent}/>

    </>
    )
}


export default Editor
