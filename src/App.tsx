import { useState } from "react";
import { Player } from "./Player";
import "./App.css";
import { zip, unzip } from "./zip";

function App() {
  const [files, setFiles] = useState<File[]>(new Array(6).fill(null));
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = Number(e.dataTransfer.getData("text/plain"));
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(sourceIndex, 1);
    newFiles.splice(targetIndex, 0, movedFile);
    setFiles(newFiles);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ul className="players">
        {files.map((file, i) => (
          <li
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
          >
            <Player
              file={file}
              onChange={(file) => {
                const newFiles = [...files];
                newFiles[i] = file;
                setFiles(newFiles);
              }}
            />
          </li>
        ))}
      </ul>
      <input
        type="button"
        value="Download"
        onClick={(event) => {
          event.preventDefault();

          const name =
            prompt("Enter the playlist name", "playlist") ?? "playlist";
          zip(files, name).then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = name + ".zip";
            a.click();
            URL.revokeObjectURL(url);
          });
        }}
      />
      <input
        type="file"
        accept=".zip"
        onChange={async (event) => {
          const { files } = event.target;
          if (files && files[0]) {
            const newFiles = await unzip(files[0]);
            setFiles(() => {
              const newFilesLength = newFiles.length;
              return newFiles.concat(new Array(6 - newFilesLength).fill(null));
            });
          }
        }}
      />
    </form>
  );
}

export default App;
