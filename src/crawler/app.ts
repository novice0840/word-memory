const fs = require("fs");
const JLPTurl = "https://ja.dict.naver.com/api/jako/getJLPTList?";
const HSKurl = "https://zh.dict.naver.com/api/zhko/getHskInfoList?pageSize=100";

const getTotalPage = async (url, language = "japanese") => {
  const response = await fetch(url);
  const jsonData = await response.json();
  if (language === "japanese") {
    return jsonData.m_totalPage;
  }
  return jsonData.searchResult.m_totalPage;
};

const sleep = (milliseconds) => {
  const start = new Date().getTime();
  let elapsed = 0;
  while (elapsed < milliseconds) {
    elapsed = new Date().getTime() - start;
  }
};

const getPageWords = async (url, language = "japanese") => {
  sleep(500);
  const response = await fetch(url);
  const jsonData = await response.json();
  if (language === "japanese") {
    return jsonData.m_items.map((item) => ({
      koreans: item.means?.map((mean) => mean.replace(/;/g, ", ")),
      original: item.show_entry,
      pronunciation: item.pron,
    }));
  }

  return jsonData.searchResult.m_items.map((item) => ({
    koreans: item.means?.map((mean) => mean.replace(/;/g, ", ")),
    original: item.show_entry,
    pronunciation: item.pron,
  }));
};

const getWords = async (url, level, language = "japanese") => {
  const urls = [];
  let words = [];
  const totalPage = await getTotalPage(url + `&level=${level}&page=1`, language);
  for (let i = 1; i <= totalPage; i += 1) {
    urls.push(url + `&level=${level}` + `&page=${i}`);
  }
  for (const url of urls) {
    console.log(url);
    words = words.concat(await getPageWords(url, language));
  }
  return words;
};

const saveJSON = (fileName, jsonName) => {
  const jsonString = JSON.stringify(jsonName);
  fs.writeFileSync(fileName, jsonString, "utf-8");
};

const getAllJLPTwords = async () => {
  const words = {};
  words.N5 = await getWords(JLPTurl, 5);
  words.N4 = await getWords(JLPTurl, 4);
  words.N3 = await getWords(JLPTurl, 3);
  words.N2 = await getWords(JLPTurl, 2);
  words.N1 = await getWords(JLPTurl, 1);

  saveJSON("JLPTwords.json", words);
};

const getAllHSKwords = async () => {
  const words = {};
  words.HSK1 = await getWords(HSKurl, 1, "chinese");
  words.HSK2 = await getWords(HSKurl, 2, "chinese");
  words.HSK3 = await getWords(HSKurl, 3, "chinese");
  words.HSK4 = await getWords(HSKurl, 4, "chinese");
  words.HSK5 = await getWords(HSKurl, 5, "chinese");
  words.HSK6 = await getWords(HSKurl, 6, "chinese");
  saveJSON("HSKwords.json", words);
};

const init = async () => {
  await getAllHSKwords();
  await getAllJLPTwords();
};

init();
