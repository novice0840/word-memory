const { saveJSON, sleep } = require("./utils");

const JLPT_BASE_URL = "https://ja.dict.naver.com/api/jako/getJLPTList";

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
    original: item.expExample1,
  }));
};

const getTotalPage = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData.m_totalPage;
};

const getPageWords = async (url) => {
  sleep(500);
  const response = await fetch(url);
  const jsonData = await response.json();
  const parsedUrl = new URL(url);
  const level = parsedUrl.searchParams.get("level");
  let words = [];
  for (const item of jsonData.m_items) {
    let word = {
      koreans: item.means?.map((mean) => mean.replace(/;/g, ", ")),
      pronunciation: item.show_entry,
      original: item.pron,
      level: `N${level}`,
    };

    word.sentences = await getJapaneseSentences(
      word.original ? word.original.split("·")[0] : word.pronunciation
    );
    words.push(word);
    console.log(
      "Crawling word:",
      word.original ?? word.pronunciation,
      word.level
    );
  }
  return words;
};

const getWords = async (url, level) => {
  const urls = [];
  let words = [];
  const totalPage = await getTotalPage(url + "?" + `&level=${level}`);
  for (let i = 1; i <= totalPage; i += 1) {
    urls.push(url + "?" + `&level=${level}` + `&page=${i}`);
  }
  for (const url of urls) {
    words.push(...(await getPageWords(url)));
  }
  return words;
};

const getAllJLPTWords = async () => {
  saveJSON("JLPT_N5_WORDS.json", await getWords(JLPT_BASE_URL, 5));
  saveJSON("JLPT_N4_WORDS.json", await getWords(JLPT_BASE_URL, 4));
  saveJSON("JLPT_N3_WORDS.json", await getWords(JLPT_BASE_URL, 3));
  saveJSON("JLPT_N2_WORDS.json", await getWords(JLPT_BASE_URL, 2));
  saveJSON("JLPT_N1_WORDS.json", await getWords(JLPT_BASE_URL, 1));
};

getAllJLPTWords();
