// // // screens/DB.js
// // import SQLite from 'react-native-sqlite-storage';

// // SQLite.enablePromise(true);

// // const openDB = async () => {
// //     try {
// //         const db = await SQLite.openDatabase({
// //             name: 'QuranDB.sqlite',
// //             location: 'default',
// //             createFromLocation: '~QuranDB.sqlite',
// //         });
// //         return db;
// //     } catch (error) {
// //         console.error('Failed to open DB:', error);
// //         throw error;
// //     }
// // };

// // export default openDB;



import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

SQLite.enablePromise(true);

const DB_NAME = 'QuranDB.sqlite';
const DB_DEST_PATH =
    Platform.OS === 'android'
        ? `/data/data/com.quranappnew/databases/${DB_NAME}`
        : `${RNFS.DocumentDirectoryPath}/${DB_NAME}`;

const openDB = async () => {
    try {
        if (Platform.OS === 'android') {
            const exists = await RNFS.exists(DB_DEST_PATH);
            if (!exists) {
                console.log('Copying DB from assets to internal databases folder...');
                await RNFS.mkdir(`/data/data/com.quranappnew/databases`);
                await RNFS.copyFileAssets(DB_NAME, DB_DEST_PATH);
                console.log('DB copied to', DB_DEST_PATH);
            }
        }

        const db = await SQLite.openDatabase({
            name: DB_NAME,
            location: 'default', // default means internal databases folder
        });

        return db;
    } catch (error) {
        console.error('Failed to open DB:', error);
        throw error;
    }
};

export default openDB;

