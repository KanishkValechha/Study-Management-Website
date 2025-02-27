// File storage utility for handling local storage of files

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  lastModified: number;
}

export interface StoredSubject {
  id: number;
  name: string;
  fileIds: string[];
}

// Save a File object as a data URL
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Convert a File to StoredFile
export const convertFileToStoredFile = async (file: File): Promise<StoredFile> => {
  const dataUrl = await fileToDataUrl(file);
  return {
    id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    dataUrl
  };
};

// Save files to local storage
export const saveFilesToStorage = async (files: File[]): Promise<StoredFile[]> => {
  // Get existing files from storage
  const existingFiles = getAllFilesFromStorage();
  
  // Convert and add new files
  const storedFilePromises = files.map(convertFileToStoredFile);
  const newStoredFiles = await Promise.all(storedFilePromises);
  
  // Combine with existing files
  const allFiles = [...existingFiles, ...newStoredFiles];
  
  // Save to localStorage
  localStorage.setItem('aceplan_files', JSON.stringify(allFiles));
  
  return newStoredFiles;
};

// Get all files from localStorage
export const getAllFilesFromStorage = (): StoredFile[] => {
  const filesJson = localStorage.getItem('aceplan_files');
  if (!filesJson) return [];
  
  try {
    return JSON.parse(filesJson) as StoredFile[];
  } catch (e) {
    console.error('Error parsing files from localStorage:', e);
    return [];
  }
};

// Get file by ID
export const getFileById = (id: string): StoredFile | undefined => {
  const files = getAllFilesFromStorage();
  return files.find(file => file.id === id);
};

// Save subjects to localStorage
export const saveSubjectsToStorage = (subjects: StoredSubject[]): void => {
  localStorage.setItem('aceplan_subjects', JSON.stringify(subjects));
};

// Get all subjects from localStorage
export const getSubjectsFromStorage = (): StoredSubject[] => {
  const subjectsJson = localStorage.getItem('aceplan_subjects');
  if (!subjectsJson) return [];
  
  try {
    return JSON.parse(subjectsJson) as StoredSubject[];
  } catch (e) {
    console.error('Error parsing subjects from localStorage:', e);
    return [];
  }
};

// Create a fake File-like object from StoredFile
export const createFileFromStored = (storedFile: StoredFile): {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  dataUrl: string;
} => {
  return {
    id: storedFile.id,
    name: storedFile.name,
    type: storedFile.type,
    size: storedFile.size,
    lastModified: storedFile.lastModified,
    dataUrl: storedFile.dataUrl
  };
};
