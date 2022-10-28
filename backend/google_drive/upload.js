const drive = require("./service");
const stream = require('stream');

const uploadFile = async (fileName, file) => {
	const bufferStream = new stream.PassThrough();
  	bufferStream.end(file.data);
	const folderId = "1Vvo3OaYkHxMsQpRG5ENfaFd4pNw6SmvR";
	const { data: { id, name } = {} } = await drive().files.create({
		resource: {
			name: fileName,
			parents: [folderId],
		},
		media: {
			mimeType: "application/pdf",
			body: bufferStream,
		},
		fields: "id,name",
	});
	console.log("File Uploaded", name, id);
	return `https://drive.google.com/file/d/${id}`
};

module.exports = uploadFile;
