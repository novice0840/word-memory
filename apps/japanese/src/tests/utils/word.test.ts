import { describe, it, expect } from "vitest";
import { getJLPTWords } from "@/utils/japanese";
import {
  getNextIndex,
  getNextUnmemorizedIndex,
  getPrevIndex,
} from "shared/utils";
import JLPT_N1_WORDS from "@shared/data/japanese/jlpt_n1";

describe("Word Util Test", () => {
  it("getNextIndex 함수 실행 시 다음 인덱스를 반환한한다", () => {
    // Given
    const curIndex = 5;
    const totalLength = 10;

    // When
    const nextIndex = getNextIndex(curIndex, totalLength);

    // Then
    expect(nextIndex).toBe(6);
  });

  it("getNextIndex 함수에서 nextIndex가 totalLength과 같으면 크면 0을 반환한다", () => {
    // Given
    const curIndex = 9;
    const totalLength = 10;

    // When
    const nextIndex = getNextIndex(curIndex, totalLength);

    // Then
    expect(nextIndex).toBe(0);
  });

  it("getNextIndex 함수 실행 시 이전 인덱스를 반환한다다", () => {
    // Given
    const curIndex = 5;
    const totalLength = 10;

    // When
    const prevIndex = getPrevIndex(curIndex, totalLength);

    // Then
    expect(prevIndex).toBe(4);
  });

  it("nextIndex가 0 보다 작은 경우 totalLength - 1을 반환한다", () => {
    // Given
    const curIndex = 0;
    const totalLength = 10;

    // When
    const prevIndex = getPrevIndex(curIndex, totalLength);

    // Then
    expect(prevIndex).toBe(9);
  });

  it("getNextUnmemorizedIndex 함수 실행 시, 다음 암기되지 않은 단어의 인덱스를 반환한다", () => {
    // Given
    const curIndex = 0;
    const memoryList = [1, 3, 5, 7, 9];
    const totalLength = 10;

    // When
    const nextIndex = getNextUnmemorizedIndex(
      curIndex,
      memoryList,
      totalLength
    );

    // Then
    expect(nextIndex).toBe(2);
  });

  it("getJLPTWords은 입력 level에 맞는 단어 목록을 반환한다", () => {
    // Given
    const level = "N1";

    // When
    const words = getJLPTWords(level);

    // Then
    expect(words).toEqual(JLPT_N1_WORDS);
  });

  it("getJLPTWords에 잘못된 level을 넣은 경우 빈 배열을 반환한다", () => {
    // Given
    const level = "N6";

    // When
    const words = getJLPTWords(level);

    // Then
    expect(words).toEqual([]);
  });
});
