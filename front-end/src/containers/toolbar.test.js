import React from "react";
import { mount } from "enzyme";

import Toolbar from "./toolbar";

describe("Toolbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Toolbar />);
  });

  it("Should render", () => {
    expect(wrapper).not.toBeNull();
  });

  it("Add Form should be hidden by default", () => {
    expect(wrapper.find("form").length).toBe(0);
  });
});

describe("Toolbar Add functionality", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Toolbar />);
    wrapper.find("IconButton").simulate("click");
  });

  it("Add Form should be show once we have clicked add", () => {
    expect(wrapper.find("form").length).toBe(1);
  });

  it("Add button should allow you to edit name and add item", () => {
    const inputField = wrapper.find("form").find("input");
    inputField.simulate("change", { target: { value: "name" } });
    expect(inputField.instance().value).toBe("name");
  });
});
