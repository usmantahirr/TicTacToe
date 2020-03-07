import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import { COLORS } from "../config";
import Header from "./header";

describe("Error", () => {
  it("Should render passed prop correctly", () => {
    const component = shallow(<Header title="Game" />);

    expect(component).toMatchSnapshot();
    expect(component.text()).toEqual("Game");
  });

  it("Should have correct styles", () => {
    const tree = renderer.create(<Header title="Game" />).toJSON();
    expect(tree).toHaveStyleRule("background", COLORS.PRIMARY);
    expect(tree).toHaveStyleRule("color", COLORS.FONT_LIGHT);
  });
});
