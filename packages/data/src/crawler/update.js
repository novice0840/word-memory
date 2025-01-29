const fs = require("fs");
const { getSentences } = require("./queryWord");
async function modifyJson(filename) {
  try {
    const data = fs.readFileSync(`./${filename}`, "utf-8");
    const jsonData = JSON.parse(data);

    for (const word of jsonData) {
      delete word.sentences;
      word.sentences = await getSentences(word.kanji ?? word.pronunciation);
      console.log("Modifying word:", word.kanji ?? word.pronunciation);
    }

    fs.writeFileSync(`./${filename}`, JSON.stringify(jsonData), "utf-8");

    console.log("JSON 파일이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("JSON 파일 수정 중 오류 발생:", error);
  }
}

modifyJson("JLPT_N5_WORDS.json");
modifyJson("JLPT_N4_WORDS.json");
modifyJson("JLPT_N3_WORDS.json");
modifyJson("JLPT_N2_WORDS.json");
modifyJson("JLPT_N1_WORDS.json");
