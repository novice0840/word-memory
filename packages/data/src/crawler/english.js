const { saveJSON, sleep } = require("./utils");
const TOEIC_WORDS = require("./TOEIC_WORD_SAMPLE.json");

const getEnglishSentences = async (word) => {
  sleep(500);
  const url = `https://en.dict.naver.com/api3/enko/search?query=${word}&range=example`;
  const headers = {
    Referer: "https://en.dict.naver.com/",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.searchResultMap.searchResultListMap.EXAMPLE.items.map((item) => ({
    korean: item.expExample2.replace(".$", ""),
    english: item.expExample1.replace(/<\/?[^>]+(>|$)/g, ""),
  }));
};

const getEnglishMeaning = async (word) => {
  sleep(500);
  const url = `https://en.dict.naver.com/api3/enko/search?query=${word}`;
  const headers = {
    Referer: "https://en.dict.naver.com/",
  };

  const response = await fetch(url, { headers });
  const data = await response.json();

  return data?.searchResultMap?.searchResultListMap?.WORD?.items?.[0]?.meansCollector?.[0]?.means?.map(
    (mean) => mean.value.replace(/\(→.*?\)/g, "")
  );
};

const getToeicWords = async () => {
  let words = [];
  for (const word of TOEIC_WORDS) {
    words.push({
      original: word,
      koreans: await getEnglishMeaning(word),
      sentences: await getEnglishSentences(word),
    });
    console.log(
      "Crawling word:",
      word,
      `${words.length}/${TOEIC_WORDS.length}`
    );
  }
  return words;
};

const getAllEnglishWords = async () => {
  saveJSON("TOEIC_WORDS.json", await getToeicWords());
};

getAllEnglishWords();
