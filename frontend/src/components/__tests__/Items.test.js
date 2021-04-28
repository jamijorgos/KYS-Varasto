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


test("renderöi annetun datan", async () => {
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

  
test("tyhjä", async () => {
  const fakeData = {  
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
  //Testataan ItemList funktiota. Renderöikö se tyhjän komponentin?
  expect(container.textContent).not.toContain("Item1"); 
  global.fetch.mockRestore();
});

  test("usean tavaran testausta", async () => {
    let fakeData2 = 
      [JSON.stringify({id: "608", name: "lokiTest11", amount: "67", location: "B2", category: "test_category1", image: "juu", number: "464735", __v: 0}),
      JSON.stringify({id: "12314", name: "lokiTest15", amount: "15", location: "B1", category: "test_category3", image: "joo", number: "46474", __v: 0})];
      
      const item1 = {id: "608", name: "lokiTest11", amount: "67", location: "B2", category: "test_category1", image: "juu", number: "464735", __v: 0};
      const item2 = {id: "12314", name: "lokiTest15", amount: "15", location: "B1", category: "test_category3", image: "joo", number: "46474", __v: 0};
      const fakeData3 = [item1,item2];
  jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
                json: () => Promise.all(fakeData2)    
              })  
            );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Items selectedItem = {"608"} setSelectedItem = {mockCallback} setMapLocation={mockCallback} />, container);
    });
    
    //Testataan ItemList funktiota. Renderöikö se annetun datan?
    expect(container.textContent).toContain("lokiTest11");
    // remove the mock to ensure tests are completely isolated  
    global.fetch.mockRestore();
  });

