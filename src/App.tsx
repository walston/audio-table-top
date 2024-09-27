import { useState } from "react";
import { Player } from "./Player";
import "./App.css";

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
    </form>
  );
}

export default App;
