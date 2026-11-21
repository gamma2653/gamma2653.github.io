type EmphasisProps = {
  text: string;
}

/** Renders resume text, turning `**phrase**` into bold. */
export default function Emphasis({ text }: EmphasisProps) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        // Odd indexes are the captured phrases.
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </>
  );
}
