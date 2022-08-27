import {createBitmap, getWhitePixels, setDistances} from './algorithm';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import *  as constants from './constants';
import * as errorTypes from './error-types';

(async () => {

    const rl = readline.createInterface({ input, output });
    try{
        const numberOfCases = await rl.question('');
        const t = parseInteger(numberOfCases, constants.MIN_TEST_CASES, constants.MAX_TEST_CASES);
        for(let i = 0; i < t; ++i ){
            const sizeOfBitmap = await rl.question('');
            const n = parseBitmapSize(sizeOfBitmap)[0];
            const m = parseBitmapSize(sizeOfBitmap)[1];
            const arrayOfPixels: number[] = [];

            for(let j = 0; j < n; ++j) {
                const row = await rl.question('');
                parseBitmapRow(m, row, arrayOfPixels);
            }
            const bitmap = createBitmap(n, m, arrayOfPixels);
            const nodes = getWhitePixels(bitmap);
            if(nodes.length === 0) throw new Error(errorTypes.NUMBER_OF_WHITE_PIXEL);
            setDistances(bitmap, nodes);
            printSolution(bitmap);
        }

        console.log('thanks for attention');
        process.exit(1);

    } catch(e) {
        let message = 'UNKNOWN ERROR';
        if (e instanceof Error) message = e.message
        console.log(message);
        process.exit(1);
    }
})();

function parseInteger(numberOfCases: string, lowerBound: number, upperBound:number): number{
    const n = Number(numberOfCases);
    if(n < lowerBound) throw new Error(errorTypes.MIN_TEST_CASES_ERROR);
    if(n > upperBound) throw new Error(errorTypes.MAX_TEST_CASES_ERROR);
    if(isNaN(n) || n % 1 !== 0) throw new Error(errorTypes.VALID_INTEGER_ERROR);
    return n;
}

function parseBitmapSize(bitmapSize: string):number[] {
    const sizeInNumbers:number[] = [];
    bitmapSize.trim()    

    const spaceCount = (bitmapSize.split(" ").length - 1);
    if(spaceCount > 1) throw new Error(errorTypes.NUMBER_OF_SPACES);

    const indexOfSpace = bitmapSize.indexOf(' ');
    const n = parseInteger(bitmapSize.substring(0, indexOfSpace), constants.MIN_EDGE, constants.MAX_EDGE);
    const m = parseInteger(bitmapSize.substring(indexOfSpace + 1), constants.MIN_EDGE, constants.MAX_EDGE);

    sizeInNumbers.push(n);
    sizeInNumbers.push(m);
    return sizeInNumbers;
}

function parseBitmapRow(lengthOfRow: number, row: string, arrayOfPixels: number[]):void {
    if(lengthOfRow != row.length) throw new Error(errorTypes.NUMBER_OF_INTEGERS);
    for(let i = 0; i < row.length; ++i) {
        const number = parseInteger(row[i], constants.BLACK_PIXEL_ID, constants.WHITE_PIXEL_ID);
        arrayOfPixels.push(number)
    }
}

function printSolution(bitmap:number[][]) {
    for(let i = 0; i < bitmap.length; ++i) {
        let row = bitmap[i][0].toString();
        for(let j = 1; j < bitmap[i].length; ++j) {
            row = row + ' ' + bitmap[i][j].toString();
        }
        console.log(row);
    }
}