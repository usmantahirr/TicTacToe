import React from "react";
import * as AppContext from "../context/app";
import { shallow } from "enzyme";
import ListItem from "./listItem";

describe("List Item", () => {
  let component;
  const setActiveGame = jest.fn();

  beforeAll(() => {
    const context = {
      activeGame: {
        id: 1,
        name: "example"
      },
      setActiveGame
    };

    jest.spyOn(AppContext, "useAppContext").mockImplementation(() => context);

    component = shallow(
      <ListItem
        game={{
          id: 1,
          name: "example",
          createdAt: new Date('05/05/2020').valueOf(),
          updatedAt: new Date('05/06/2020').valueOf()
        }}
      />
    );
  });

  it("Should call set active function from context", () => {
    component.find("IconButton").simulate("click");
    expect(setActiveGame).toHaveBeenCalled();
  });

  it("should pass required values in context", () => {
    expect(component.find("span").text()).toBe("example");
  });

  it("Should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
