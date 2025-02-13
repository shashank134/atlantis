import React from "react";
import renderer from "react-test-renderer";
import { ProgressBar } from "./ProgressBar";

describe("with props", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ProgressBar currentStep={2} totalSteps={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("accepts small size", () => {
    const tree = renderer
      .create(<ProgressBar currentStep={2} totalSteps={3} size={"small"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
