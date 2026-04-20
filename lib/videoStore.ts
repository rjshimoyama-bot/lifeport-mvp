export type StoredVideoMeta = {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  size: number;
};

const DB_NAME = "movis-demo-db";
const STORE_NAME = "videos";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVideo(file: File): Promise<StoredVideoMeta> {
  const db = await openDb();

  const id = `video-${Date.now()}`;
  const record = {
    id,
    fileName: file.name,
    fileType: file.type,
    uploadedAt: new Date().toISOString(),
    size: file.size,
    blob: file,
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(record);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  db.close();

  return {
    id,
    fileName: file.name,
    fileType: file.type,
    uploadedAt: record.uploadedAt,
    size: file.size,
  };
}

export async function getVideoBlob(id: string): Promise<Blob | null> {
  const db = await openDb();

  const result = await new Promise<any>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });

  db.close();

  return result?.blob ?? null;
}

export async function listVideos(): Promise<StoredVideoMeta[]> {
  const db = await openDb();

  const results = await new Promise<any[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });

  db.close();

  return results
    .map((item) => ({
      id: item.id,
      fileName: item.fileName,
      fileType: item.fileType,
      uploadedAt: item.uploadedAt,
      size: item.size,
    }))
    .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export async function deleteVideo(id: string): Promise<void> {
  const db = await openDb();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  db.close();
}
