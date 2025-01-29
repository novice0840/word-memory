interface SentencesProps {
  sentences: {
    korean: string;
    japanese: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  return (
    <div className="h-64 overflow-auto w-full text-xl rounded-md border p-4">
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

export default Sentences;
