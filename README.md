# 단어 암기 서비스

- React, TypeScript, PWA 기반
- 약 7000개의 일본어 단어 수록됨
- 일본어, 중국어 제공
- 추후 다른 언어 추가 예정
- 현재 영어 버전 개발중

## 배포링크

- [일본어](japanese-word-memory.vercel.app)
- [중국어](chinese-word-memory.vercel.app)
- [영어](english-word-memory.vercel.app)

## 단어 형태

```json
[
  {
    "koreans": ["…씩", "같은 분량만큼 되풀이함"],
    "hiragana": "-ずつ",
    "kanji": "宛",
    "level": "N1",
    "sentences": [
      {
        "korean": "에너지 자원을 수입에 의존하다",
        "japaneses": "エネルギー<ruby><rb>資源</rb><rt>しげん</rt></ruby>を<ruby><rb>輸入</rb><rt>ゆにゅう</rt></ruby>に<ruby><rb>頼</rb><rt><strong>たよ</strong></rt></ruby><strong>る</strong>"
      },
      {
        "japanese": "<ruby><rb>病気</rb><rt>びょうき</rt></ruby>の<ruby><rb>治癒</rb><rt>ちゆ</rt></ruby>を<ruby><rb>仏力</rb><rt>ぶつりき</rt></ruby>に<ruby><rb>頼</rb><rt><strong>たよ</strong></rt></ruby><strong>る</strong>.",
        "korean": "병의 치유를 불력에 의지하다"
      }
    ]
  }
]
```
