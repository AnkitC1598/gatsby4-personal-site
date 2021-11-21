const http = require("https");
const fs = require("fs");
const sizeOf = require("image-size");

// Public url prefix for images store in Azure
const blobStorageBaseUrl = `https://gadzooks.blob.core.windows.net/instagram/`;

// JSON file path
const filePath = `${blobStorageBaseUrl}content/posts_1.json`;
const filePath1 = `content/data/instagram_posts.json`;

// fetch the posts_1 JSON file
new Promise((resolve, reject) => {
	// Read synchronously from a local JSON file
	// const content = fs.readFileSync(filePath);

	// Fetch
	http.get(filePath, response => {
		const chunks = [];
		response
			.on("data", chunk => chunks.push(chunk))
			.on("end", () => {
				const buffer = Buffer.concat(chunks);
				resolve(JSON.parse(buffer));
			})
			.on("error", err => reject(err));
	});
})
	.then(jsonContent => {
		// filter out non-applicable files
		const filtered = jsonContent.filter(i => {
			const item = i.media[0];
			const uri = item.uri;
			const uriLength = uri.length;

			return uri.substr(uriLength - 3, 3) === "jpg";
		});

		// Map to promise array
		const output = filtered.map(i => {
			const item = i.media[0];
			const uri = blobStorageBaseUrl + item.uri;

			return new Promise((resolve, reject) => {
				http.get(uri, response => {
					const chunks = [];
					response
						.on("data", chunk => chunks.push(chunk))
						.on("end", () => {
							const buffer = Buffer.concat(chunks);
							const size = sizeOf(buffer);
							console.log(size);
							resolve({ ...item, ...size, ratio: size.height / size.width });
						})
						.on("error", err => reject(err));
				});
			});
		});

		// Write output to a file
		Promise.all(output).then(data => {
			try {
				fs.writeFileSync(filePath1, JSON.stringify(data));
			} catch (err) {
				console.log(err);
			}
		});
	})
	.catch(err => {
		console.error(err);
	});
