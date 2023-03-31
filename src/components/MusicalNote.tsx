export interface MusicalNoteProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function MusicalNote({ name, isSelected, onClick }: MusicalNoteProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex justify-center items-center p-4 rounded border-gray-50
     ${
       isSelected
         ? "bg-blue-900 hover:bg-blue-800"
         : "bg-slate-700 hover:bg-slate-600"
     } `}
    >
      <p>{name}</p>
    </button>
  );
}
