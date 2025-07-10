/// <reference types="cypress" />
import Sentences from "./Sentences";

describe("<Sentences />", () => {
  it("renders", () => {
    const sentences = [
      {
        korean: "안녕하세요",
        original: "<ruby>こんにちは<rt>こん</rt>にちは</ruby>",
      },
      {
        korean: "감사합니다",
        original: "<ruby>ありがとう<rt></rt></ruby>",
      },
    ];
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Sentences sentences={sentences} />);
  });
});
