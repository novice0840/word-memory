const fs = require("fs");

async function modifyJson(filename) {
  try {
    const data = fs.readFileSync(`${filename}`, "utf-8");
    const jsonData = JSON.parse(data);

    for (const word of jsonData) {
      const koreans = [];
      word.sentences = word.sentences.filter((sentence) => {
        if (koreans.includes(sentence.korean) || sentence.korean == "") {
          console.log("중복 문장", word.original, sentence.korean);
          return false;
        }
        koreans.push(sentence.korean);
        return true;
      });
    }

    fs.writeFileSync(`${filename}`, JSON.stringify(jsonData), "utf-8");

    console.log("JSON 파일이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("JSON 파일 수정 중 오류 발생:", error);
  }
}

modifyJson("../words/japanese/JLPT_N1_WORDS.json");
