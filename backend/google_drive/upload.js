const drive = require('./service');

const uploadFile = async (fileName, file) => {
  const folderId = '1Vvo3OaYkHxMsQpRG5ENfaFd4pNw6SmvR';
  const { data: { id, name } = {} } = await drive.files.create({
    resource: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: 'application/pdf',
      body: file,
    },
    fields: 'id,name',
  });
  console.log('File Uploaded', name, id);
};

module.exports = uploadFile;