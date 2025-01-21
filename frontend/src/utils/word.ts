export const getNextIndex = (
  curIndex: number,
  memoryList: number[],
  totalLength: number
) => {
  // 다음 단어가 없을 경우 null을 반환
  if (memoryList.length === totalLength) return null;

  let nextIndex = (curIndex + 1) % totalLength;
  while (memoryList.includes(nextIndex)) {
    nextIndex = (nextIndex + 1) % totalLength;
  }
  return nextIndex;
};
