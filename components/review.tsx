export default function Review() {
  return (
    <span className="flex flex-col gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span>review {i}</span>
      ))}
    </span>
  );
}
