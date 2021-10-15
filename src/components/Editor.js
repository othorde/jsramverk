import React, {useState, useEffect} from "react";

//Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
/* initierar klienten med en endpoint som är URL till den server vi vill att paketet ska skickas till */
import FormCreate from "./FormCreate";
import socketIOClient from "socket.io-client";

//Components

const Editor = (theDocument) => {
    let doc = theDocument.whatDocument;
    const [editorContent, setEditorContent] = useState('');
    const [socket, setSocket] = useState('');
    const [docc, setDocc] = useState("");
    const [editorState, setEditorState] = useState("");

    useEffect(() => {
        const ENDPOINT = "https://jsramverk-editor-olto20.azurewebsites.net/";

        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
            const ENDPOINT = "localhost:1337";
        }
        const s = socketIOClient(ENDPOINT);
        setDocc(doc)
        setSocket(s)

        return () => { 
            s.disconnect()
        }
    }, [doc[1]])

    useEffect(() => {
        if (editorContent === "") return
        socket.emit("create", docc[2]); // innebär att vi joinar alltid rum, om vi är i samma doc
        socket.emit("changes", editorContent) // från klient till server

    }, [editorContent])
    


    useEffect(() => {
        if (editorContent === "") return
        const handler = (data) => {
            let newData = [];
            newData[0] = data[0]; //ny body
            newData[1] = docc[1]; // samma titel
            newData[2] = data[1]; // id 
            setDocc(newData)            
        }

        socket.on("receive-changes", handler) // från klient till server
        return () => {
            socket.off("receive-changes", handler) // från klient till server
        }
    }, [editorContent])


    const handleClick = async() => {
        if (editorState !== undefined) {
            setEditorContent([editorState.getData(), doc[2], doc[3]])
        }
    }

    useEffect(() => {
        }, [setEditorState])
    
  
    return (
    <>
    <h2 data-testid="header"> {docc[1]} </h2>

    <div onKeyUp={(e) => { handleClick() }}> 
          
        <CKEditor data-testid="editor"  
        class="editor"
        editor={  ClassicEditor }
        data={docc[0]}
        onReady={ editor => {
            setEditorState(editor)
        } }
      /*   onChange={ ( event, editor ) => {
            setEditorContent([editor.getData(), doc[2], doc[3]])
        } } */
  
        //onKeyUp={(e) => this.inputChange('name', e.target.value)}
    /> </div>

    <FormCreate editorContent={editorContent}/>
    </>
    )
}


export default Editor
