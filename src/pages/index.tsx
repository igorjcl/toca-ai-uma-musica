import { Header } from "@/components/Headet";
import { MusicalNote } from "@/components/MusicalNote";
import { SpinLoading } from "@/components/SpinLoading";
import { MusicalNoteType, notes } from "@/utils/notes";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [songs, setSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [noteSelected, setNoteSelected] = useState<MusicalNoteType>(notes[0]);

  async function getSongs() {
    try {
      setLoading(true);
      setSongs([]);
      const response = await fetch("/api/get-songs", {
        method: "POST",
        body: JSON.stringify({
          note: noteSelected.name,
        }),
      });
      const json = await response.json();

      setTimeout(() => {
        if (!loading) return;
      }, 7000);

      const musicList = JSON.parse(json.songs);

      setSongs(musicList);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <>
      <Header />
      <main
        className="w-full bg-gradient-to-r 
      bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] 
      from-slate-950 via-blue-950 to-slate-950
     text-white flex flex-row items-center h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto relative w-full max-w-md px-5 lg:px-0 lg:max-w-4xl gap-5">
          <div className="h-full flex flex-col justify-center items-start">
            <div className="flex flex-row gap-2 flex-wrap">
              {notes.map((note) => (
                <MusicalNote
                  onClick={() => setNoteSelected(note)}
                  key={note.id}
                  name={note.name}
                  isSelected={note.id === noteSelected.id}
                />
              ))}
            </div>

            <button
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 mt-5 px-6 rounded-full"
              onClick={getSongs}
            >
              Gerar
            </button>
          </div>

          <div className="my-4 h-full flex flex-col justify-center items-center overflow-auto md:overflow-hidden">
            {loading ? (
              <SpinLoading />
            ) : (
              <h2 className="self-start mb-4 text-3xl font-extrabold">
                Resultados:
              </h2>
            )}
            {songs.map((music, index) => (
              <div
                key={index}
                className="mb-2 max-w-md w-full text-sm lg:text-base px-3 py-4 bg-gray-800 rounded-lg"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: (props) => {
                      return (
                        <a
                          className="text-blue-600 break-words"
                          target="_blank"
                          rel="no-opener"
                          href={props.href}
                        >
                          {props.children}
                        </a>
                      );
                    },
                  }}
                >
                  {music}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
