const fs = require("fs");

async function modifyJson(filename) {
  try {
    const data = fs.readFileSync(`./${filename}`, "utf-8");
    const jsonData = JSON.parse(data);

    for (const word of jsonData) {
      word.sentences = word.sentences.map((sentence) => {
        sentence.japanese = sentence.japanese.replace(/<\/?strong>/g, "");
        return sentence;
      });
    }

    fs.writeFileSync(`../words/${filename}`, JSON.stringify(jsonData), "utf-8");

    console.log("JSON 파일이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("JSON 파일 수정 중 오류 발생:", error);
  }
}

modifyJson("../words/JLPT_N5_WORDS.json");
modifyJson("../words/JLPT_N4_WORDS.json");
modifyJson("../words/JLPT_N3_WORDS.json");
modifyJson("../words/JLPT_N2_WORDS.json");
modifyJson("../words/JLPT_N1_WORDS.json");
