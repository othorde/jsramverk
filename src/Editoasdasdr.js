import React, {Component, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Editor() {

	const [datas, setDatas] = useState([])

    function getDataToConsoleLog() {
        console.log(datas)
    }

    return (
    
        <div className="App">
        <div> <button onClick = {getDataToConsoleLog}>Spara</button></div>
        <div> <button onClick = {getDataToConsoleLog}>Hämta</button></div>
        <div> <button onClick = {getDataToConsoleLog}>Skapa nytt</button></div>

        <h2>Editor komponent: CKEditor</h2>
        <CKEditor
            editor={ ClassicEditor }
            data="<p>Skriv något!</p>"
            
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                /* const data = editor.getData(); */
                setDatas(editor.getData())
            } }
            onBlur={ ( event, editor ) => {
                /* console.log( 'Blur.', editor ); */
            } }
            onFocus={ ( event, editor ) => {
                /* console.log( 'Focus.', editor ); */
            } }
        />
    </div>
    )
}
export default Editor
