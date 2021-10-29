import React from 'react';
import Pdf from 'react-to-pdf'
import DOMPurify from 'dompurify'

const ref = React.createRef()

const PDF = (prop) => {

    const myHTML = prop.editorContent[0];

    function createMarkup() {
        return {__html: DOMPurify.sanitize(myHTML)};
      }

    return(
        <>
            <div className="Post" ref={ref}>
            <div dangerouslySetInnerHTML={createMarkup()} />            
                </div>
            <Pdf targetRef={ref} filename="new.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Spara som PDF</button>}
            </Pdf>
        </>
    )
}

export default PDF;