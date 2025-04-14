import { Injectable } from '@nestjs/common';
const INTERVAL = 5;
let COUNTER = 0;
const ROOT_PATH = 'https://aireader.onrender.com/';

@Injectable()
export class AppService {
  /**
   * A simple function that returns "Hello World!".
   *
   * This is the default route for the API.
   *
   * @returns A string that says "Hello World!".
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * This function is used to keep the site alive on a free Heroku dyno.
   * It will attempt to make a request to the root of the site every INTERVAL minutes.
   * The counter is used to prevent the function from running multiple times.
   */
  doCron() {
    if (COUNTER > 1) return;
    setInterval(
      () => {
        try {
          COUNTER++;
          void fetch(ROOT_PATH).then((res) => {
            console.log('Status: ', res.status);
          });
          console.log(`Total requests made: ${COUNTER}`);
        } catch (error) {
          console.error(error);
        }
      },
      INTERVAL * 60 * 1000,
    );
  }
}
