import { SpinLoading } from "@/components/SpinLoading";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function getSongs() {
    try {
      setLoading(true);
      setSongs([]);
      const response = await fetch("/api/get-songs");
      const json = await response.json();

      setTimeout(() => {
        if (!loading) return;
      }, 7000);

      const musicList = JSON.parse(json.songs);
      console.log(musicList);

      setSongs(musicList);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <main className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl">Músicas</h1>
      <div className="my-4">
        {loading && <SpinLoading />}
        {songs.map((music, index) => (
          <div key="index" className="mb-2 px-3 py-4 bg-gray-800 rounded-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{music}</ReactMarkdown>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 px-6 rounded-full"
        onClick={getSongs}
      >
        Gerar
      </button>
    </main>
  );
}
