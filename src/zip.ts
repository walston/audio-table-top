import JSZip from "jszip";

function m3u(files: File[]): string {
  return ["#EXTM3U"].concat(files.map((file) => file?.name ?? "")).join("\n");
}

export async function zip(files: File[], name: string): Promise<Blob> {
  const zip = new JSZip();
  zip.file(`${name}.m3u`, m3u(files.filter((file) => file)));
  for (let i = 0; i < files.length; i++) {
    if (files[i]) {
      zip.file(files[i].name, files[i]);
    }
  }

  return zip.generateAsync({ type: "blob" });
}

export async function unzip(blob: Blob): Promise<File[]> {
  const zip = await JSZip.loadAsync(blob);
  const files: File[] = [];
  let playlist: string[] = [];

  for (const filename of Object.keys(zip.files)) {
    const fileData = await zip.file(filename)?.async("blob");
    if (fileData) {
      const file = new File([fileData], filename);
      files.push(file);
      if (filename.endsWith(".m3u")) {
        const text = await file.text();
        playlist = text
          .split("\n")
          .filter((line) => line && !line.startsWith("#"));
      }
    }
  }

  if (playlist.length > 0) {
    const playlistFiles = playlist
      .map((name) => files.find((file) => file.name === name))
      .filter((file): file is File => !!file);
    return playlistFiles.slice(0, 6);
  } else {
    return files.slice(0, 6);
  }
}
