interface ExampleSentencesProps {
  sentences: {
    korean: string;
    japanese: string;
  }[];
  showMeaning: boolean;
}

const ExampleSentences = ({
  sentences,
  showMeaning,
}: ExampleSentencesProps) => {
  return (
    <div className="h-64 overflow-auto w-full text-xl">
      {sentences.map((item, index) => (
        <div key={index}>
          <div
            dangerouslySetInnerHTML={{
              __html: showMeaning
                ? item.japanese
                : item.japanese.replace(/<rt>(.*?)<\/rt>/g, ""),
            }}
          />
          <div>{showMeaning && item.korean}</div>
        </div>
      ))}
    </div>
  );
};

export default ExampleSentences;
