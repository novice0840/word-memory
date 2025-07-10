/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../cypress/support/component.tsx" />
import Sentences from "./Sentences";

describe("<Sentences />", () => {
  it("예문 읽기 버튼을 더블클릭해도 한 번만 클릭되어야한다", () => {
    const sentences = [
      {
        korean: "안녕하세요",
        original: "<ruby>こんにちは<rt>こん</rt>にちは</ruby>",
      },
      {
        korean: "감사합니다",
        original: "<ruby>ありが토う<rt></rt></ruby>",
      },
    ];

    cy.mount(<Sentences sentences={sentences} />);

    let clickCount = 0;

    cy.get("button")
      .first()
      .then(($button) => {
        $button.on("click", () => {
          clickCount += 1;
        });
      });

    cy.get("button")
      .first()
      .dblclick()
      .then(() => {
        expect(clickCount).to.eq(1);
      });
  });
});
