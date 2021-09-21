
import React from "react";
import {  render, fireEvent, screen, toHaveBeenCalled } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

import FormCreate from '../components/FormCreate/index';

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




it("Updates value", async () => {
  window.alert = jest.fn();


  await act(async () => {

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

    render(<FormCreate editorContent={["Jenny", "1010"]}/>, container );
    
    const button = screen.getByText("Uppdatera");
    fireEvent.change(button, {target: {value: "body" }})
    expect(button.value).toBe("body")
    fireEvent.click(button)

  });
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Uppdaterat');

}) 
