const INTERVAL = 5;
const ROOT_PATH = "https://aireader.onrender.com/";

/**
 * Runs every INTERVAL minutes and attempts to make a request to the root of the site.
 * This is used to keep the site alive on a free Heroku dyno.
 */
async function main() {
	setInterval(() => {
		try {
			fetch(ROOT_PATH).then((res) => {
				console.log('Status: ', res.status);
			});
		} catch (error) {
			console.error(error);
		}
	}, INTERVAL * 60 * 1000);
}

main();
