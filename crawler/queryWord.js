const sleep = (milliseconds) => {
  const start = new Date().getTime();
  let elapsed = 0;
  while (elapsed < milliseconds) {
    elapsed = new Date().getTime() - start;
  }
};

const getExampleSentences = async (word) => {
  sleep(500);
  const url = `https://ja.dict.naver.com/api3/jako/search?query=${word}`;
  const headers = {
    Referer: "https://ja.dict.naver.com/",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.searchResultMap.searchResultListMap.EXAMPLE.items.map((item) => ({
    koreans: item.expExample2,
    japanese: item.expExample1,
  }));
};

module.exports = { getExampleSentences };
