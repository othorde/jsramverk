import React from "react";
import {  render, fireEvent, screen, toHaveBeenCalledWith, toHaveBeenCalled} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

import Form from '../components/Form/index';


let container = null;
beforeEach(() => {
// setup a DOM element as a render target
container = document.createElement("div");
document.body.appendChild(container);
});

afterEach(() => {
// cleanup on exiting
unmountComponentAtNode(container);
container.remove();
container = null;
});


it("the user click on documentlist and on a document, that will change the value of h2", async () => {
 
    window.alert = jest.fn();

    await act( async () => {
        render (<Form/>, container);
        const createtest = screen.getByText("Spara som");
        fireEvent.click(createtest)
    })

    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Dokument skapat');


}) 
  
  