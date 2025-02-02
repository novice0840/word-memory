const { saveJSON, sleep } = require("./utils");
const german_A1_WORDS = require("../words/german/german_A1.json");
const german_A2_WORDS = require("../words/german/german_A2.json");
const german_B1_WORDS = require("../words/german/german_B1.json");
const german_B2_WORDS = require("../words/german/german_B2.json");
const german_C1_WORDS = require("../words/german/german_C1.json");
const german_C2_WORDS = require("../words/german/german_C2.json");

const getGermanSentences = async (word) => {
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

const getGermanMeaning = async (word) => {
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

const getGermanWords = async (words) => {
  let result = [];
  for (const word of words) {
    result.push({
      original: word,
      koreans: await getGermanMeaning(word),
      sentences: await getGermanSentences(word),
    });
    console.log("Crawling word:", word, `${result.length}/${words.length}`);
  }
  return result;
};

const getAllGermanWords = async () => {
  saveJSON(
    "../words/german/german_A1_WORDS.json",
    await getGermanWords(german_A1_WORDS)
  );
  saveJSON(
    "../words/german/german_A2_WORDS.json",
    await getGermanWords(german_A2_WORDS)
  );
  saveJSON(
    "../words/german/german_B1_WORDS.json",
    await getGermanWords(german_B1_WORDS)
  );
  saveJSON(
    "../words/german/german_B2_WORDS.json",
    await getGermanWords(german_B2_WORDS)
  );
  saveJSON(
    "../words/german/german_C1_WORDS.json",
    await getGermanWords(german_C1_WORDS)
  );
  saveJSON(
    "../words/german/german_C2_WORDS.json",
    await getGermanWords(german_C2_WORDS)
  );
};

getAllGermanWords();
