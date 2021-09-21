
import React from "react";
import {  render, fireEvent, screen, getAllByRole, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

import App from '../App';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "../components/Editor";

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
    const fakeDoc = [{
        _id: 1010,
        name: "Joni Baez",
        body: "123, Charming Avenue",
      }, {
      _id: 10101,
      name: "Joni Lepp",
      body: "321, Not Charming Avenue",

    }]

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeDoc)
        })
      );


    await act( async () => {
        render (<App/>, container);
    })



    const dropdown = screen.getByTestId("dropdown");
    const display = dropdown.children[0];
    const display1 = dropdown.children[1];

    expect(display.textContent).toBe("-- Eller välj en fil att uppdatera --");
    expect(display1.textContent).toBe("Joni Baez");
    fireEvent.click(display1);
    const dropdownOptions = getAllByRole(dropdown, 'option');
    fireEvent.click(dropdownOptions[2]);

    await waitFor(async() => {
        const header = screen.getByTestId("header");
        expect(header.textContent).toBe(" Joni Baez ");

    });

  });
