import filesystem from "../filesystem/data";

export const getDirectory = (path) => {
  let current = filesystem;

  for (const folder of path) {
    if (current[folder]) {
      current = current[folder];
    } else {
      return null;
    }
  }

  return current;
};

export const listDirectory = (path) => {
  const dir = getDirectory(path);

  if (!dir || typeof dir !== "object") {
    return "Directory not found";
  }

  return Object.keys(dir).join("    ");
};

export const readFile = (path, filename) => {
  const dir = getDirectory(path);

  if (!dir || !dir[filename]) {
    return "File not found";
  }

  return dir[filename];
};