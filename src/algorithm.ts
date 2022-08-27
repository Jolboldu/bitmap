import *  as constants from './constants';

export type PixelCoordinates = {
    x: number,
    y: number
}

export function getWhitePixels(bitmap: number[][]): PixelCoordinates[] {
    const pixelCoordinates: PixelCoordinates[] = [];
    for (let i = 0; i < bitmap.length; i++) {
        for (let j = 0; j < bitmap[0].length; j++) {
            if (bitmap[i][j] === constants.WHITE_PIXEL_ID) {
                const whitePixelCoordinates: PixelCoordinates= { x:i, y: j };
                bitmap[i][j] = 0;
                pixelCoordinates.push(whitePixelCoordinates);
            }
        }
    }
    return pixelCoordinates;
}

export function createBitmap(col: number, rows: number, data:number[]): number[][]{
    const bitmap: number[][] = [];
    for(let i = 0; i < col; i++) {
        const bitmapRow:number[] = [];
        for(let j = 0; j < rows; ++j) {
            let value = Number.MAX_SAFE_INTEGER;
            if(data[j+i*rows] === 1) value = 1; 
            bitmapRow.push(value);
        }
        bitmap.push(bitmapRow);
    }
    return bitmap;
}

export function setDistances(bitmap: number[][], nodes: PixelCoordinates[]):void {
    while (nodes.length > 0) {
        const node = nodes.shift();
        if(node){
            const connectedNodes = getConnectedNodes(bitmap, node);
            for (const connectedNode of connectedNodes) {
                const distance = getDistance(node, connectedNode);
                const totalDistance = bitmap[node.x][node.y] + distance;
                if (totalDistance < bitmap[connectedNode.x][connectedNode.y]) {
                    bitmap[connectedNode.x][connectedNode.y] = totalDistance;
                    nodes.push(connectedNode);
                }
            }    
        }
    }
}

function getConnectedNodes(bitmap:number[][], pixel: PixelCoordinates):PixelCoordinates[] {
    const connectedNodes: PixelCoordinates[] = [];

    pushConnectedNode(bitmap, {x: pixel.x - 1, y: pixel.y}, connectedNodes);
    pushConnectedNode(bitmap, {x: pixel.x + 1, y: pixel.y}, connectedNodes);
    pushConnectedNode(bitmap, {x: pixel.x, y: pixel.y - 1 }, connectedNodes);
    pushConnectedNode(bitmap, {x: pixel.x, y: pixel.y + 1}, connectedNodes);
    return connectedNodes;
}

function pushConnectedNode(bitmap:number[][], pixel: PixelCoordinates, connectedNodes: PixelCoordinates[]): void{
    if(pixel.x < 0) return ;
    if(pixel.x >= bitmap.length ) return;
    if(pixel.y < 0) return;
    if(pixel.y >= bitmap[0].length ) return;
    connectedNodes.push(pixel);
}

function getDistance(pixelA: PixelCoordinates, pixelB: PixelCoordinates) {
    return Math.abs(pixelA.x - pixelB.x) + Math.abs(pixelA.y - pixelB.y)
}  