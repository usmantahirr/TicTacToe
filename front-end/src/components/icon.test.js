import React from "react";
import { shallow } from "enzyme";

import Icon from "./icon";

describe("Icon", () => {
  it("should handle click event", () => {
    const clickHandler = jest.fn();
    const component = shallow(<Icon onClick={clickHandler} />);

    component.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it("Should render children", () => {
    const component = shallow(
      <Icon>
        <i>sample icon</i>
      </Icon>
    );

    expect(component.children()).toHaveLength(1);
    expect(component.find("i").text()).toEqual("sample icon");
  });
});
