import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import { COLORS } from "../config";
import Error from "./error";

describe("Error", () => {
  it("Should render passed prop correctly", () => {
    const component = shallow(<Error message="Error Message" />);

    expect(component).toMatchSnapshot();
    expect(component.text()).toEqual("Error Message");
  });

  it("Should have correct styles", () => {
    const tree = renderer.create(<Error message="Error Message" />).toJSON();
    expect(tree).toHaveStyleRule("background", COLORS.DANGER);
    expect(tree).toHaveStyleRule("color", COLORS.FONT_LIGHT);
  });
});
