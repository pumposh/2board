import { sha256 } from 'js-sha256';

export interface FileMetadata {
  fileName: string;
  lastModifiedDate: number;
  contentType: string;
}

/**
 * Convert ArrayBuffer to string
 * @param buffer ArrayBuffer to convert
 * @return {string} Converted string
*/
export const ab2str = (buffer: ArrayBuffer): string =>
  new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');

/**
* Convert string to ArrayBuffer
* @param str String to convert
* @return {ArrayBuffer} Converted ArrayBuffer
*/
export const str2ab = (str: string): ArrayBuffer => {
  const buffer = new ArrayBuffer(str.length);
  const bufferInterface = new Uint8Array(buffer);
  Array.from(str)
    .forEach((_, index: number) => { bufferInterface[index] = str.charCodeAt(index); });
  return buffer;
};

/**
 * Convert ArrayBuffer to Blob
 * @param buffer ArrayBuffer to convert
 * @return {Blob} Converted blob
*/
export const ab2blob = (buffer: ArrayBuffer): Blob => new Blob([buffer]);

/**
 * Convert Buffer to ArrayBuffer
 * @param buffer Buffer to convert
 * @return {ArrayBuffer} Converted ArrayBuffer
*/
export const buffer2ab = (buffer: Buffer): ArrayBuffer => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
};

/**
* Convert blob to ArrayBuffer
* @param blob Blob to convert
* @return {Promise<ArrayBuffer>} Converted ArrayBuffer
*/
export const blob2ab = (blob: Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = () => resolve(reader.result as ArrayBuffer);
  reader.onerror = (error) => reject(error);
});

/**
 * Convert blob to file with required metadata
 * @param blob Blob to convert
 * @param meta Metadata to append to file
 * @return {File} Converted file
 */
export const blob2file = (inputBlob: Blob, meta: FileMetadata) => {
  const blob: any = inputBlob.slice(0, inputBlob.size, meta.contentType);
  blob.lastModifiedDate = meta.lastModifiedDate;
  blob.fileName = meta.fileName;
  return blob as File;
};

/**
 * Fetch blob contents from URL
 * @param url URL to fetch
 * @return {Promise<Blob>} Fetched blob
*/
export const fetchBlob = async (url: string): Promise<Blob> => fetch(url).then((r) => r.blob());

/**
 * Encode UTF8 ⇢ base64
 * @param str
 * @returns {string} Encoded base64 string
 */
export const b64EncodeUnicode = (str: string) =>
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) => String.fromCharCode(parseInt(p1, 16))));

/**
 * Decode base64 ⇢ UTF8 (atob)
 * @param str
 * @returns {string} Decoded UTF8 string
 */
export const b64DecodeUnicode = (str: string) => decodeURIComponent(
  Array.prototype.map.call(atob(str), (c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''),
);

/**
 * Generate SHA-256 hash of input string
 * @param input String to hash
 * @returns {string} Hashed string
 */
export const generateHash = (input: string | object): string => {
  let str = '';
  if (typeof input === 'object') {
    str = JSON.stringify(input);
  } else {
    str = input;
  }
  /** Preferred method for synchronous hashing */
  return sha256(str);
};
