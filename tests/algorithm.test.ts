import {createBitmap, getWhitePixels, setDistances, PixelCoordinates} from '../src/algorithm';
const maxInt = Number.MAX_SAFE_INTEGER;

describe("testing algorithm module", () => {
    let bitmap: number[][] = [];
    let expectedBitmap: number[][] = [];
    let whitePixelCoordinates: PixelCoordinates[] = [];

    describe("bitmap(3,4)", () => {
        const input = [0,0,0,1,0,0,1,1,0,1,1,0];

        it("has to return 2d array representation of bitmap(3,4)", () => {
            bitmap = createBitmap(3, 4, input);
            expectedBitmap = [
                [maxInt, maxInt, maxInt, 1],
                [maxInt, maxInt, 1, 1],
                [maxInt, 1, 1, maxInt]
            ];
            expect(bitmap).toEqual(expectedBitmap);
        });

        it("has to return array white pixel coordinates", () => {
            whitePixelCoordinates = getWhitePixels(bitmap);
            const expectedWhitePixelCoordinates: PixelCoordinates[] = [
                { x: 0, y: 3 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 1 },
                { x: 2, y: 2 }
            ]
            expect(expectedWhitePixelCoordinates).toEqual(whitePixelCoordinates);
        });    
    
        it("has to set distances to bitmap", () => {
            setDistances(bitmap, whitePixelCoordinates);
            expectedBitmap = [
                [3, 2, 1, 0],
                [2, 1, 0, 0],
                [1, 0, 0, 1]
            ];
            expect(bitmap).toEqual(expectedBitmap);
        });    
    });

    describe("bitmap(5,7)", () => {
        const input = [
            0, 0, 0, 1, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1,
            0, 1, 0, 0, 0, 1, 0
        ];

        it("has to return 2d array representation of bitmap(5,7)", () => {
            bitmap = createBitmap(5, 7, input);
            expectedBitmap = [
                [maxInt, maxInt, maxInt, 1, maxInt, maxInt, 1],
                [maxInt, maxInt, maxInt, maxInt, maxInt, maxInt, maxInt],
                [maxInt, maxInt, 1, maxInt, 1, maxInt, maxInt],
                [1, maxInt, maxInt, 1, maxInt, maxInt, 1],
                [maxInt, 1, maxInt, maxInt, maxInt, 1, maxInt]
            ];
            expect(bitmap).toEqual(expectedBitmap);
        });

        it("has to return array white pixel coordinates", () => {
            whitePixelCoordinates = getWhitePixels(bitmap);
            const expectedWhitePixelCoordinates: PixelCoordinates[] = [
                { x: 0, y: 3 },
                { x: 0, y: 6 },
                { x: 2, y: 2 },
                { x: 2, y: 4 },
                { x: 3, y: 0 },
                { x: 3, y: 3 },
                { x: 3, y: 6 },
                { x: 4, y: 1 },
                { x: 4, y: 5 }
            ]
            expect(expectedWhitePixelCoordinates).toEqual(whitePixelCoordinates);
        }); 
        
        it("has to set distances to bitmap", () => {
            setDistances(bitmap, whitePixelCoordinates);
            expectedBitmap = [
                [3, 2, 1, 0, 1, 1, 0],
                [2, 2, 1, 1, 1, 2, 1],
                [1, 1, 0, 1, 0, 1, 1],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 0, 1, 1, 1, 0, 1],
            ];
            expect(bitmap).toEqual(expectedBitmap);
        });    

    });

    describe("bitmap(1,10)", () => {
        const input = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0];

        it("has to return 2d array representation of bitmap(1,10)", () => {
            bitmap = createBitmap(1, 10, input);
            expectedBitmap = [
                [maxInt, maxInt, maxInt, maxInt, maxInt, maxInt, 1, maxInt, maxInt, maxInt],
            ];
            expect(bitmap).toEqual(expectedBitmap);
        });

        it("has to return array white pixel coordinates", () => {
            whitePixelCoordinates = getWhitePixels(bitmap);
            const expectedWhitePixelCoordinates: PixelCoordinates[] = [
                { x: 0, y: 6 },
            ]
            expect(expectedWhitePixelCoordinates).toEqual(whitePixelCoordinates);
        });  

        it("has to set distances to bitmap", () => {
            setDistances(bitmap, whitePixelCoordinates);
            expectedBitmap = [[6, 5, 4, 3, 2, 1, 0, 1, 2, 3]];
            expect(bitmap).toEqual(expectedBitmap);
        });    

    });
});



  