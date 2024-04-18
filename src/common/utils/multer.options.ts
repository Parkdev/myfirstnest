import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); // 현재폴더의 부모 폴더로 가서, uploads 폴더를 만드세요
  } catch (error) {
    // 오류가 난다면
    console.log('The folder already exists...'); // 폴더가 이미 있는것
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`); // 매개 변수로 받은 이름으로 업로드 폴더 안에 폴더를 만든다.
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  // 폴더를 만든이후
  createFolder(folder);

  return multer.diskStorage({
    // 옵션을 설정
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`); // 만든 폴더에 저장하겠다.
      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname); // 확장자를 가져온다.

      // 파일 이름 설정
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

// multer 두번째인자에 넣어주면 된다.
export const multerOptions = (folder: string) => {
  // 폴더 이름을 받으면 해당 폴더를 만들어 저장
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
