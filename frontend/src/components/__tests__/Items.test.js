import React from 'react';
import ReactDOM from 'react-dom';
import Items from '../Items.js';

import {render, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';

const renderer = require('react-test-renderer');


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

it("renderöi kaatumatta", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Items></Items>, div);
})

it("renders fake data", async () => {
    const fakeData = {    id: "213324", name: "Item1",    amount: "32",    location: "A123", category: "category1", image : "Kuva", number: "12345"  };  jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(fakeData)    })  );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Items id="123" />, container);
    });
  
    expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
    expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);
  
    // remove the mock to ensure tests are completely isolated  
    global.fetch.mockRestore();});

