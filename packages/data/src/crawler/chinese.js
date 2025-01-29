const { saveJSON, sleep } = require("./utils");

const CHINESE_BASE_URL = "https://zh.dict.naver.com/api/zhko/getHskInfoList";
const CHINESE_SENTENCE_BASE_URL = "https://zh.dict.naver.com/api3/zhko/search";

const getHSKTotalPage = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData.searchResult.m_totalPage;
};

const getChineseSentences = async (word) => {
  sleep(500);
  const url =
    CHINESE_SENTENCE_BASE_URL + "?" + `range=example&page=1&query=${word}`;
  const headers = {
    Referer: "https://zh.dict.naver.com/",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.searchResultMap.searchResultListMap.EXAMPLE.items.map((item) => ({
    korean: item.expExample2.trim().replace(".", ""),
    original: item.expExample1
      .replace(/<\/?strong>/g, "")
      .replace(/。$/, "")
      .trim(),
    pronunciation: item.expExample1Pronun.replace(/。$/, "").trim(),
  }));
};

const getPageWords = async (url) => {
  sleep(500);
  const response = await fetch(url);
  const jsonData = await response.json();
  const parsedUrl = new URL(url);
  const page = parsedUrl.searchParams.get("page");
  const totalPage = await getHSKTotalPage(url);

  let words = [];
  for (let i = 0; i < jsonData.searchResult.m_items.length; i++) {
    const item = jsonData.searchResult.m_items[i];

    let word = {
      koreans: item?.means,
      pronunciation: item?.pron,
      original: item?.show_entry,
      level: item?.level,
      sentences: await getChineseSentences(item.show_entry),
    };

    words.push(word);
    console.log(
      "Crawling word:",
      word.original,
      item.level,
      `${page}/${totalPage}`
    );
  }

  return words;
};

const getHSKWords = async (level) => {
  const urls = [];
  let words = [];
  const totalPage = await getHSKTotalPage(
    CHINESE_BASE_URL + "?&page=1&pageSize=20" + `&level=${level}`
  );

  for (let i = 1; i <= totalPage; i += 1) {
    urls.push(
      CHINESE_BASE_URL + "?" + `&level=${level}` + `&page=${i}&pageSize=20`
    );
  }
  for (const url of urls) {
    words.push(...(await getPageWords(url)));
  }
  return words;
};

const getAllHSKWords = async () => {
  // saveJSON("HSK_1_WORDS.json", await getHSKWords(1));
  saveJSON("HSK_2_WORDS.json", await getHSKWords(2));
  saveJSON("HSK_3_WORDS.json", await getHSKWords(3));
  saveJSON("HSK_4_WORDS.json", await getHSKWords(4));
  saveJSON("HSK_5_WORDS.json", await getHSKWords(5));
  saveJSON("HSK_6_WORDS.json", await getHSKWords(6));
};

getAllHSKWords();
