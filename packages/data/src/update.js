const fs = require("fs");

async function modifyJson(filename) {
  try {
    const data = fs.readFileSync(`${filename}`, "utf-8");
    const jsonData = JSON.parse(data);

    for (const word of jsonData) {
      word.koreans = word.koreans.map((korean) =>
        korean.replace(/\(=[^)]*\)/g, "")
      );
    }

    fs.writeFileSync(`${filename}`, JSON.stringify(jsonData), "utf-8");

    console.log("JSON 파일이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error("JSON 파일 수정 중 오류 발생:", error);
  }
}

modifyJson("../words/english/TOEIC_WORDS.json");
modifyJson("../words/english/TOEFL_WORDS.json");
