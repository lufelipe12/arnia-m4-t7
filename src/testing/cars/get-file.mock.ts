import { join } from 'path';

import { getFileFromBuffer } from './get-file-from-buffer';

export const getFileMock = async () => {
  const { buffer, stream } = await getFileFromBuffer(
    join(__dirname, 'monza.jpeg'),
  );

  const photo: Express.Multer.File = {
    filename: 'monza',
    destination: './uploads',
    fieldname: 'jpeg',
    mimetype: 'testing',
    originalname: 'monza.jpeg',
    path: './monza.jpeg',
    size: 126,
    buffer,
    stream,
    encoding: 'teste',
  };

  return photo;
};
