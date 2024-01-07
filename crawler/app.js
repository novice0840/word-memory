const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function run() {
  // 브라우저를 열기
  const browser = await puppeteer.launch({ headless: "new" });

  // 새 페이지를 열기
  const page = await browser.newPage();

  // 페이지로 이동
  await page.goto("https://ja.dict.naver.com/#/jlpt/list?level=5&part=allClass&page=1");
  const content = await page.content();
  const $ = cheerio.load(content);
  const wordLists = $("li.row");
  //   console.log(wordLists);
  console.log(wordLists.length);
  wordLists.each((index, word) => {
    console.log("test");
    console.log(index, $(word).find(".origin > a"));
  });

  // 브라우저 닫기
  await browser.close();
}

// 함수 실행
run();
