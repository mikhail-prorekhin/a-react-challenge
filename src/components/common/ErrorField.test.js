import { shallow } from "enzyme";
import ErrorField from "./ErrorField";
import React from "react";

describe("Error Field", () => {
  it("should render an error ", () => {
    const field = shallow(
      <ErrorField
        
        name="firstName"
        label="first name"
        meta={{ error: "error", touched: true }}
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".field__error").length).toBe(1);
  });
  it("should render no error ", () => {
    const field = shallow(
      <ErrorField
        
        name="firstName"
        label="first name"
        meta={{ touched: true }}
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".field__error").length).toBe(0);
  });

  it("should render with extra class ", () => {
    const field = shallow(
      <ErrorField
        inputModificator="field__input--many"
        name="firstName"
        label="first name"
        meta={{}}
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".field__input--many").length).toBe(1);
  });


});
