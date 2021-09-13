import React, {useState, useEffect} from "react";
//Editor

//Config 

//Components
import Editor from "./Editor";
import Form from "./Form";
//Hook
import { useDocumentFetch } from "../hooks/useDocumentFetch";

const Home = () => {
    const {state, loading, error, setFormCreate} = useDocumentFetch(); /* hämtar  */
    return (
    <>
        <Editor editorData/>
        <Form setFormCreate={setFormCreate}/>
    </>
    )
}

export default Home
