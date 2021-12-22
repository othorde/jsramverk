
import React, {useState, useEffect, useContext} from "react";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import AppContext from './authorized';
import {Redirect} from "react-router-dom";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

//Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Components

import FormCreate from "./FormCreate";
import socketIOClient from "socket.io-client";
import PDF from "./PDF";
import FormInvite from "./FormInvite/invite";
import apisetting from "../API";
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const Editor = (theDocument) => {
    let doc = theDocument.whatDocument;
    const [editorContent, setEditorContent] = useState('');
    const [socket, setSocket] = useState('');
    const [docc, setDocc] = useState("");
    const [editorState, setEditorState] = useState("");
    const [pdfCreateState, setPdfCreateState] = useState(false);
    const [codeMode, setCodeMode] = useState(false);
    const myContext = useContext(AppContext);

    useEffect(() => {
        const ENDPOINT = "https://jsramverk-editor-olto20.azurewebsites.net/";

        const s = socketIOClient(ENDPOINT);
        setDocc(doc)
        setSocket(s)

        return () => { 
            s.disconnect()
        }
    }, [doc[1]])  // ändrade från doc[1] till doc?

    useEffect(() => {
        if (editorContent === "") return
        socket.emit("create", docc[2]); // innebär att vi joinar alltid rum, om vi är i samma doc
        socket.emit("changes", editorContent) // från klient till server

    }, [editorContent,socket])

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
    }, [editorContent])  //la till docc och socket

    const handleClick = async() => {
        if (editorState !== undefined) {
            if(codeMode) {
                setEditorContent([editorState.getValue(), doc[2], doc[3], codeMode])
            } else {
                setEditorContent([editorState.getData(), doc[2], doc[3]])
            }
        }
    }

    const toggleStatePdf = (e) => {
        e.preventDefault();
        setPdfCreateState(false)
    }

    const toggleEditor = (e) => {
        e.preventDefault();
        if (codeMode) {
            setCodeMode(false)
        } else {
            setCodeMode(true)
        }
    }

    const createPdf = async(e) => {
        if (editorContent[0] !== undefined) {
            e.preventDefault();
            setPdfCreateState(true);
        } else {
            alert("Kan inte skapa en tom PDF. Skriv något i editorn eller hämta ett dokument")
        }
    }

    const executeCode = async(e) => {
        await apisetting.postExecuteCode(editorContent[0])
    }

    useEffect(() => {
        if (docc) {
            if(codeMode) {
                setEditorContent([editorState.getValue(), doc[2], doc[3], codeMode])
            } else {
                setEditorContent([editorState.getData(), doc[2], doc[3]])
            }
        }
    }, [setEditorState, editorState])  //la till docc och codeMode

    if (!myContext.authorized) {
        return <Redirect to="/login"/>;
    }

    return (
    <>
    { !pdfCreateState ?
    (
    <div>

        <h2 data-testid="header"> {docc[1]} </h2>
        {codeMode ? (        
            <button onClick={toggleEditor}> {codeMode } Editor</button>
            ): 
            <button onClick={toggleEditor}> {codeMode } CodeMode</button>}

            <div onKeyUp={(e) => { handleClick() }}>
            { !codeMode ? (

                <CKEditor 
                 data-testid="editor"  
                    class="editor"
                    editor={  ClassicEditor  }
                    config={{
                   
					}}
                    data={docc[0]}

                    onReady={ editor => {
                        setEditorState(editor)
                    } }

                />

                ) : (
            <div>
                <CodeMirror
                    value={docc[0]}
                    options={{
                        mode: 'xml',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    editorDidMount={(editor, data) => {
                        setEditorState(editor)
                    }}
                />
                <button onClick={executeCode}>Exekvera koden</button>
            </div>
            )}
            </div>

        <button onClick={createPdf}
            type="button">
            Skapa PDF </button>
        
        <FormInvite editorContent={editorContent}/>
        <FormCreate editorContent={editorContent}/>
         
    </div>)
    : 
    ( <div>
        <PDF editorContent={editorContent}/>
        <button onClick={toggleStatePdf}>Redigera dokumentet</button>
    </div>
    )
    }
    </>
    )
}


export default Editor
