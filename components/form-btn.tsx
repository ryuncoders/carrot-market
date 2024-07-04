interface FormBtnProps {
  loading: boolean;
  text: string;
}
export default function FormBtn({ loading, text }: FormBtnProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="primary-btn text-base p-2 disabled:bg-neutral-500 disabled:cursor-not-allowed"
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
}
