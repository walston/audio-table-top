import { useState } from "react";
import "./App.css";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <>
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files!);
          setFiles(files);
        }}
      />
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
