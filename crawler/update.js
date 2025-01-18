const fs = require("fs");
const { getExampleSentences } = require("./queryWord");
async function modifyJson(filename) {
  try {
    const data = fs.readFileSync(`./${filename}`, "utf-8");
    const jsonData = JSON.parse(data);

    for (const word of jsonData) {
      if (word.kanji !== null) continue;
      word.exampleSentences = await getExampleSentences(word.pronunciation);
      console.log("Modifying word:", word.pronunciation);
    }

    fs.writeFileSync(`./${filename}`, JSON.stringify(jsonData), "utf-8");

    console.log("JSON 파일이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("JSON 파일 수정 중 오류 발생:", error);
  }
}

modifyJson("JLPT_N2_WORDS.json");
