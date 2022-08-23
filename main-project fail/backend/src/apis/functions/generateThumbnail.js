const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

//import를 사용하기 위해서 package.json에 모듈화를 허용해야 되는데 지원이 안 됐다.
// 그래서 require로 불러와서 사용하게 된다.

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.thumbnailTrigger = async (event, context) => {
  // 1. event와 context의 데이터를 간단히 로그로 확인하기
  console.log('hello world');
  console.log('===========================');
  console.log('context:', context);
  console.log('event', event);
  console.log('===========================');
  // const gcsEvent = event;
  // console.log(`Processing file: ${gcsEvent.name}`);
  // console.log(`event: ${JSON.stringify(event)}`);
  // console.log(`event: ${JSON.stringify(context)}`);

  // 2. 이미 썸네일이 있는 경우 종료(즉, 썸네일로 트리거된 경우)
  if (event.name.includes('thumb/')) return;

  // 3. 썸네일 프로세스
  const storage = new Storage().bucket(event.bucket);
  await Promise.all(
    [
      { size: 320, fname: 'thumb/s' },
      { size: 640, fname: 'thumb/m' },
      { size: 1280, fname: 'thumb/l' },
    ].map(
      (el) =>
        new Promise((resolve, reject) => {
          storage
            .file(event.name)
            .createReadStream() // 4. 기존의 파일을 읽어오기
            .pipe(sharp().resize({ width: el.size })) // 5. event 안에 있는 file을 활용하여 썸네일 생성
            .pipe(storage.file(`${el.fname}/${event.name}`).createWriteStream()) // 6. 생성된 썸네일을 재업로드
            .on('finish', () => resolve())
            .on('error', () => reject());
        }),
    ),
  );
};
