import fs from 'fs/promises';
import path from 'path';
import { encryptBuffer, decryptBuffer } from './crypto';

const STORAGE_ROOT = path.join(process.cwd(), 'vault-storage');

/**
 * Ensures the storage directory exists.
 */
async function ensureDir() {
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
}

/**
 * Saves an encrypted file to local backup storage.
 * @param userId User directory
 * @param fileName File name
 * @param data Cleartext data
 * @param systemKey System encryption key part
 */
export async function saveToVault(
  userId: string,
  fileName: string,
  data: Buffer,
  systemKey: string
) {
  await ensureDir();
  const userDir = path.join(STORAGE_ROOT, userId);
  await fs.mkdir(userDir, { recursive: true });

  const encryptedData = encryptBuffer(data, systemKey);
  const filePath = path.join(userDir, fileName + '.enc');
  
  await fs.writeFile(filePath, encryptedData);
  return filePath;
}

/**
 * Reads and decrypts a file from local vault.
 */
export async function readFromVault(
  userId: string,
  fileName: string,
  systemKey: string
): Promise<Buffer> {
  const filePath = path.join(STORAGE_ROOT, userId, fileName + '.enc');
  const encryptedData = await fs.readFile(filePath);
  
  return decryptBuffer(encryptedData, systemKey);
}

/**
 * Lists filenames in the user's vault.
 */
export async function listVaultFiles(userId: string): Promise<string[]> {
  const userDir = path.join(STORAGE_ROOT, userId);
  try {
    const files = await fs.readdir(userDir);
    return files.map(f => f.replace('.enc', ''));
  } catch (e) {
    return [];
  }
}
