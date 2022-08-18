import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장하는 로직
    // console.log(files);
    // const aaa = await files[0];
    // const bbb = await files[1];
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    const bucket = 'b4_myproject';
    const storage = new Storage({
      projectId: 'b04-myproject',
      keyFilename: 'b04-myproject-aee7eebcc2e0.json',
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream()) //파일에서 이 파일을 읽어와줘 그리고 pipe에 넘겨줘
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패!!'));
          }),
      ),
    );

    // const results = await Promise.all([
    //   new Promise((resolve, reject) => {
    //     waitedFiles[0]
    //       .createReadStream()
    //       .pipe(storage.file(waitedFiles[0].filename).createWriteStream()) //파일에서 이 파일을 읽어와줘 그리고 pipe에 넘겨줘
    //       .on('finish', () => resolve('성공!!'))
    //       .on('error', () => reject('실패!!'));
    //   }), // 한 번에 하기 위해 await을 빼고 배열로 묶고 중간 파일들을 ;이 아니라 ,로 연결한다.

    //   new Promise((resolve, reject) => {
    //     waitedFiles[1]
    //       .createReadStream()
    //       .pipe(storage.file(waitedFiles[1].filename).createWriteStream()) //파일에서 이 파일을 읽어와줘 그리고 pipe에 넘겨줘
    //       .on('finish', () => resolve('성공!!'))
    //       .on('error', () => reject('실패!!'));
    //   }),
    // ]);

    return results;
  }
}
