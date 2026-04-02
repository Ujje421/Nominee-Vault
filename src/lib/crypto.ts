import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// IV length for GCM is typically 12 bytes
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;

export interface EncryptedData {
  ciphertext: string;
  iv: string;
  tag: string;
}

/**
 * Derives a strong 256-bit key using PBKDF2
 * In a real 3-part split key system, the parts would be combined first.
 */
function deriveKey(secret: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
}

/**
 * Encrypts a buffer using AES-256-GCM.
 * @param buffer Data to encrypt
 * @param secret Master or combined key
 */
export function encryptBuffer(buffer: Buffer, secret: string): Buffer {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = deriveKey(secret, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Format: Salt (16) + IV (12) + Tag (16) + Encrypted Data
  return Buffer.concat([salt, iv, tag, encrypted]);
}

/**
 * Decrypts a buffer using AES-256-GCM.
 * @param encryptedBuffer Data to decrypt containing Salt, IV, Tag, and Ciphertext
 * @param secret Master or combined key
 */
export function decryptBuffer(encryptedBuffer: Buffer, secret: string): Buffer {
  // Extract components
  const salt = encryptedBuffer.subarray(0, SALT_LENGTH);
  const iv = encryptedBuffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = encryptedBuffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const ciphertext = encryptedBuffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

  const key = deriveKey(secret, salt);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

/**
 * Splits a system key into 3 parts using simple XOR (for demonstration of the concept).
 * In production Shamir's Secret Sharing (SSS) is recommended for true threshold cryptography.
 */
export function generateSplitKeys(): { userKey: string; nomineeKey: string; systemKey: string } {
  // Generate a random master key
  const masterKey = crypto.randomBytes(32);
  
  // Generate 2 random parts
  const part1 = crypto.randomBytes(32);
  const part2 = crypto.randomBytes(32);
  
  // Calculate part 3 such that P1 ^ P2 ^ P3 = Master
  const part3 = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    part3[i] = masterKey[i] ^ part1[i] ^ part2[i];
  }

  return {
    userKey: part1.toString('base64'),
    nomineeKey: part2.toString('base64'),
    systemKey: part3.toString('base64'),
  };
}

/**
 * Reconstructs the master key from the 3 parts.
 */
export function reconstructMasterKey(userKey: string, nomineeKey: string, systemKey: string): Buffer {
  const p1 = Buffer.from(userKey, 'base64');
  const p2 = Buffer.from(nomineeKey, 'base64');
  const p3 = Buffer.from(systemKey, 'base64');

  const master = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    master[i] = p1[i] ^ p2[i] ^ p3[i];
  }
  
  return master;
}
