import React from "react";
import { shallow } from "enzyme";
import Fabricante from "./Fabricante";

describe("Fabricante", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Fabricante />);
    expect(wrapper).toMatchSnapshot();
  });
});
