import { Injectable } from '@nestjs/common';
const INTERVAL = 5;
const ROOT_PATH = 'https://aireader.onrender.com/';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  doCron() {
    setInterval(
      () => {
        try {
          void fetch(ROOT_PATH).then((res) => {
            console.log('Status: ', res.status);
          });
        } catch (error) {
          console.error(error);
        }
      },
      INTERVAL * 60 * 1000,
    );
  }
}
