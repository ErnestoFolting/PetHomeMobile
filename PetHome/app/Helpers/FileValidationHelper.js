
import { Image } from 'react-native'
import * as FileSystem from 'expo-file-system'


const validateImage = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);

    let errMsg = ""
    let width = 0
    let height = 0

    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxFileSizeMB = 5;
    const minAspectRatio = 9 / 16;
    const maxAspectRatio = 16 / 9;

    const extension = fileInfo.uri.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
        errMsg = "Invalid format"
        return errMsg
    }

    const fileSizeMB = fileInfo.size / (1024 * 1024);

    if (fileSizeMB > maxFileSizeMB) {
        errMsg = "Bigger size"
        return errMsg
    }

    try {
        const { width, height } = await new Promise((resolve, reject) => {
            Image.getSize(fileInfo.uri, (w, h) => resolve({ width: w, height: h }), reject);
        });

        const aspectRatio = width / height;

        console.log(aspectRatio);

        if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
            errMsg = "Invalid aspect ratio";
        }
    } catch (e) {
        console.log('Error getting image size', e);
    }

    return errMsg;
};

export default validateImage;