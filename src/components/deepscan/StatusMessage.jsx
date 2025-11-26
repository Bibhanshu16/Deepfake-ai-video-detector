// components/deepscan/StatusMessage.jsx

export default function StatusMessage({ status, error }) {
  if (!status && !error) return null;

  return (
    <div className="mt-3 space-y-1 text-xs">
      {status && (
        <p className="text-sky-300">
          Status: <span className="font-semibold">{status}</span>
        </p>
      )}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
