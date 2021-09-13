import { useState, useEffect} from 'react';

import apisetting from "../API";

const initialState = {
    page: 0,
    oneDocument: []

};

export const useDocumentFetch = () => {

    const [state, setState] = useState(initialState); /* dekonstruera state */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formCreate, setFormCreate] = useState('');
    const [getDataFromEditor, setDataFromEditor] = useState('');
    console.log("bajs", getDataFromEditor)

    const fetchDocuments = async() => {
        try {
            setError(false);
            setLoading(true);
            
            const documents = {
                oneDocument: await apisetting.getAllDocuments()
            }
    
            let page = 0
            setState(prev => ({
                ...documents,
                oneDocument:
                   page > 1 ? [...prev.oneDocument, ...documents.oneDocument] : [...documents.oneDocument]
                
            }));
          
        } catch (error) {
            setError(true);
        }
        setLoading(false)
    };


    //initial render 
    useEffect(() => {
        fetchDocuments();
    }, [])
    
    return {state, loading, error, setFormCreate, setDataFromEditor, getDataFromEditor}
};
