import { createReadStream } from 'fs';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export const getFileFromBuffer = async (path: string) => {
  const readStream = createReadStream(path);

  const chunks = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chunk) => chunks.push(chunk));

      readStream.on('error', (err) => reject(err));

      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks),
          stream: readStream,
        });
      });
    },
  );
};
