const { sleep } = require("./utils");

const getJapaneseSentences = async (word) => {
  sleep(500);
  const url = `https://ja.dict.naver.com/api3/jako/search?query=${word}`;
  const headers = {
    Referer: "https://ja.dict.naver.com/",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.searchResultMap.searchResultListMap.EXAMPLE.items.map((item) => ({
    korean: item.expExample2,
    japanese: item.expExample1,
  }));
};

module.exports = { getJapaneseSentences };
