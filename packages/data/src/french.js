const { saveJSON, sleep } = require("./utils");
const FRENCH_A1_WORDS = require("../words/french/french_A1.json");
const FRENCH_A2_WORDS = require("../words/french/french_A2.json");
const FRENCH_B1_WORDS = require("../words/french/french_B1.json");
const FRENCH_B2_WORDS = require("../words/french/french_B2.json");
const FRENCH_C1_WORDS = require("../words/french/french_C1.json");
const FRENCH_C2_WORDS = require("../words/french/french_C2.json");

const getFrenchSentences = async (word) => {
  sleep(500);
  const url = `https://dict.naver.com/api3/frko/search?query=${word}&range=example`;
  const headers = {
    Referer: "https://dict.naver.com/",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.searchResultMap.searchResultListMap.EXAMPLE.items.map((item) => ({
    korean: item.expExample2
      .replace(/[.]$/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\(↔[^>]+>/g, ""),
    original: item.expExample1
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/.$/g, ""),
  }));
};

const getFrenchMeaning = async (word) => {
  sleep(500);
  const url = `https://dict.naver.com/api3/frko/search?query=${word}`;
  const headers = {
    Referer: "https://dict.naver.com/",
  };

  const response = await fetch(url, { headers });
  const data = await response.json();

  return data?.searchResultMap?.searchResultListMap?.WORD?.items?.[0]?.meansCollector?.[0]?.means?.map(
    (mean) => mean.value.replace(/\(→.*?\)/g, "").replace(/\(=[^)]*\)/g, "")
  );
};

const getFrenchWords = async (words) => {
  let result = [];
  for (const word of words) {
    result.push({
      original: word,
      koreans: await getFrenchMeaning(word),
      sentences: await getFrenchSentences(word),
    });
    console.log("Crawling word:", word, `${result.length}/${words.length}`);
  }
  return result;
};

const getAllFrenchWords = async () => {
  saveJSON(
    "../words/french/FRENCH_A1_WORDS.json",
    await getFrenchWords(FRENCH_A1_WORDS)
  );
  saveJSON(
    "../words/french/FRENCH_A2_WORDS.json",
    await getFrenchWords(FRENCH_A2_WORDS)
  );
  saveJSON(
    "../words/french/FRENCH_B1_WORDS.json",
    await getFrenchWords(FRENCH_B1_WORDS)
  );
  saveJSON(
    "../words/french/FRENCH_B2_WORDS.json",
    await getFrenchWords(FRENCH_B2_WORDS)
  );
  saveJSON(
    "../words/french/FRENCH_C1_WORDS.json",
    await getFrenchWords(FRENCH_C1_WORDS)
  );
  saveJSON(
    "../words/french/FRENCH_C2_WORDS.json",
    await getFrenchWords(FRENCH_C2_WORDS)
  );
};

getAllFrenchWords();
