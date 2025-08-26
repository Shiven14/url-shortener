import { useState } from "react";
import copy from "copy-to-clipboard";

type Resp = { code: string; shortUrl: string; longUrl: string } | { error: string };

const api = import.meta.env.VITE_API_BASE as string;

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function shorten(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!/^https?:\/\//i.test(longUrl)) {
      setError("Enter a valid URL starting with http:// or https://");
      return;
    }
    try {
      setLoading(true);
      const r = await fetch(`${api}/links`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      const data = (await r.json()) as Resp;
      if (!r.ok || "error" in data) {
        setError(("error" in data ? data.error : "Server error") as string);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function CopyBtn({ text }: { text: string }) {
    return (
      <button
        className="px-3 py-2 rounded bg-zinc-900 text-white hover:bg-zinc-800"
        onClick={() => copy(text)}
        type="button"
      >
        Copy
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AWS URL Shortener</h1>
        <form onSubmit={shorten} className="flex gap-2 mb-3">
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {result && !("error" in result) && (
          <div className="border rounded p-3 bg-white flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm text-zinc-500">Short URL</div>
              <a className="text-blue-700 underline break-all" href={result.shortUrl} target="_blank">
                {result.shortUrl}
              </a>
            </div>
            <CopyBtn text={result.shortUrl} />
          </div>
        )}
        <p className="text-xs text-zinc-500 mt-6">
          Backend: Lambda + API Gateway + DynamoDB (free tier). Frontend: Vite + React (GitHub Pages).
        </p>
      </div>
    </main>
  );
}
