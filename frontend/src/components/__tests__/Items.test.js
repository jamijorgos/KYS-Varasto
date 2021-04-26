import React from 'react';
import {render, ReactDOM, unmountComponentAtNode} from 'react-dom';
import { act } from "react-dom/test-utils";
import Items from '../Items.js';

import {screen} from '@testing-library/react';



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

const mockCallback = jest.fn();


test("renders fake data", async () => {
    const fakeData = {    id: "213324", name: "Item1",    amount: "32",    location: "A123", category: "category1", image : "Kuva", number: "12345"  
  };  
  jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
                json: () => Promise.resolve(fakeData)    
              })  
            );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Items selectedItem = {"213324"} setSelectedItem = {mockCallback} setMapLocation={mockCallback} />, container);
      
    });
    
    //Testataan ItemList funktiota. Renderöikö se annetun datan?

    //expect(container.querySelector("option").textContent).toContain("category1");
    expect(container.textContent).toContain("Item1");
  
    // remove the mock to ensure tests are completely isolated  
    global.fetch.mockRestore();
  });

  test("tyhjän palautus", async () => {
    const fakeData = {    id: "", name: "",    amount: "",    location: "", category: "", image : "", number: ""  
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
                json: () => Promise.resolve(fakeData)    
              })  
            );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Items selectedItem = {"213324"} setSelectedItem = {mockCallback} setMapLocation={mockCallback} />, container);
      
    });
    
    //Testataan ItemList funktiota. Renderöikö se annetun datan?

    //expect(container.querySelector("option").textContent).toContain("category1");
    expect(container.textContent).toContain("Item1");
  
    // remove the mock to ensure tests are completely isolated  
    global.fetch.mockRestore();
  });

