# 단어 암기 서비스

- React, TypeScript, PWA 기반
- turbo 기반 monorepo (서비스 4개, 공통 패키지 2개)
- 일본어, 중국어, 영어, 프랑스어 제공
- 일본어 9221개, 중국어 6312개, 영어 5811개, 프랑스어 250개

## 배포링크

- [일본어](https://japanese-word-memory.vercel.app)
- [중국어](https://chinese-word-memory.vercel.app)
- [영어](https://english-word-memory.vercel.app)
- [프랑스어](https://french-word-memory.vercel.app/)

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

## 주요 기능 목록

### 공통

- [x] JLPT 급수별 단어장
- [x] 단어장에는 단어와 예문이 존재
- [x] 암기완료/다시외우기 선택 후 다음 단어로 이동
- [x] 단어장 재접속 시 가장 최근에 보던 단어부터 재시작
- [x] 위쪽 양 옆에 좌우 화살표 아이콘이 있어 클릭 시 이전, 다음 단어로 이동 가능
- [x] 왼쪽 상단에 햄버거 아이콘 클릭 시 단어장 목록의 요약본이 나옴 각 단어 클릭 시 해당 단어로 이동
- [x] 오른쪽 상단에 설정 아이콘 클릭 시 암기 현황이 나오고 각 단어장을 초기화할 수 있다.
- [x] 예문 클릭 시 원어 음성 나오는 기능
- [x] 각 언어별로 패키지 분리 후 모노레포 적용
- [x] 단어장 별 암기 완료한 단어 갯수 추가
- [x] 단어장의 단어를 다 외운경우 홈으로 돌아가는 Dialog가 나옴

### 일본어

- [ ] 일본어 예문 연습 - 일본어 문장을 보고 해당 문장의 히라가나를 작성

### 중국어

- [x] 중국어 추가

### 영어

- [x] 영어 추가

### 프랑스어

- [x] 프랑스어 추가

### 독일어

- [ ] 독일어 추가 (양질의 독일어 데이터가 없어 보류)

### Bug List

- 같은 key 중복 같은 한자를 가진 단어가 2개 이상 있는 것으로 보임
