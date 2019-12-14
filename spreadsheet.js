const GoogleSpreadsheet = require('google-spreadsheet')
const {
    promisify
} = require('util')


const creds = (process.env.GOOGLE_PRIVATE_KEY) ? {
    client_email: 'da-sheets@driveanalysis-262004.iam.gserviceaccount.com',
    private_key: process.env.GOOGLE_PRIVATE_KEY
} : require('./cred/client_secret.json');


async function accessSpreadsheet(sheetToUpdate, data) {
    const doc = new GoogleSpreadsheet('10Py9Q9-UwJXYF9i8H4QASoz6HnSBBrpgCz33cKiot-M');

    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();

    let sheet = info.worksheets[sheetToUpdate];
    await promisify(sheet.addRow)(data)

}

module.exports = {
    accessSpreadsheet
}