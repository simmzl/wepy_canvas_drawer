'use strict';

var QR = function () {

    // alignment pattern
    var adelta = [0, 11, 15, 19, 23, 27, 31, // force 1 pat
    16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];

    // version block
    var vpat = [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69];

    // final format bits with mask: level << 3 | mask
    var fmtword = [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, //L
    0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, //M
    0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, //Q
    0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b //H
    ];

    // 4 per version: number of blocks 1,2; data width; ecc width
    var eccblocks = [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];

    // Galois field log table
    var glog = [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];

    // Galios field exponent table
    var gexp = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];

    // Working buffers:
    // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
    var strinbuf = [],
        eccbuf = [],
        qrframe = [],
        framask = [],
        rlens = [];
    // Control values - width is based on version, last 4 are from table.
    var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
    var ecclevel = 2;
    // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
    function setmask(x, y) {
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        // y*y = 1+3+5...
        bt = y;
        bt *= y;
        bt += y;
        bt >>= 1;
        bt += x;
        framask[bt] = 1;
    }

    // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
    function putalign(x, y) {
        var j;

        qrframe[x + width * y] = 1;
        for (j = -2; j < 2; j++) {
            qrframe[x + j + width * (y - 2)] = 1;
            qrframe[x - 2 + width * (y + j + 1)] = 1;
            qrframe[x + 2 + width * (y + j)] = 1;
            qrframe[x + j + 1 + width * (y + 2)] = 1;
        }
        for (j = 0; j < 2; j++) {
            setmask(x - 1, y + j);
            setmask(x + 1, y - j);
            setmask(x - j, y - 1);
            setmask(x + j, y + 1);
        }
    }

    //========================================================================
    // Reed Solomon error correction
    // exponentiation mod N
    function modnn(x) {
        while (x >= 255) {
            x -= 255;
            x = (x >> 8) + (x & 255);
        }
        return x;
    }

    var genpoly = [];

    // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
    function appendrs(data, dlen, ecbuf, eclen) {
        var i, j, fb;

        for (i = 0; i < eclen; i++) {
            strinbuf[ecbuf + i] = 0;
        }for (i = 0; i < dlen; i++) {
            fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
            if (fb != 255) /* fb term is non-zero */
                for (j = 1; j < eclen; j++) {
                    strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];
                } else for (j = ecbuf; j < ecbuf + eclen; j++) {
                strinbuf[j] = strinbuf[j + 1];
            }strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
        }
    }

    //========================================================================
    // Frame data insert following the path rules

    // check mask - since symmetrical use half.
    function ismasked(x, y) {
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        bt = y;
        bt += y * y;
        bt >>= 1;
        bt += x;
        return framask[bt];
    }

    //========================================================================
    //  Apply the selected mask out of the 8.
    function applymask(m) {
        var x, y, r3x, r3y;

        switch (m) {
            case 0:
                for (y = 0; y < width; y++) {
                    for (x = 0; x < width; x++) {
                        if (!(x + y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }break;
            case 1:
                for (y = 0; y < width; y++) {
                    for (x = 0; x < width; x++) {
                        if (!(y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }break;
            case 2:
                for (y = 0; y < width; y++) {
                    for (r3x = 0, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) r3x = 0;
                        if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }break;
            case 3:
                for (r3y = 0, y = 0; y < width; y++, r3y++) {
                    if (r3y == 3) r3y = 0;
                    for (r3x = r3y, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) r3x = 0;
                        if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }
                break;
            case 4:
                for (y = 0; y < width; y++) {
                    for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) {
                            r3x = 0;
                            r3y = !r3y;
                        }
                        if (!r3y && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }break;
            case 5:
                for (r3y = 0, y = 0; y < width; y++, r3y++) {
                    if (r3y == 3) r3y = 0;
                    for (r3x = 0, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) r3x = 0;
                        if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }
                break;
            case 6:
                for (r3y = 0, y = 0; y < width; y++, r3y++) {
                    if (r3y == 3) r3y = 0;
                    for (r3x = 0, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) r3x = 0;
                        if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }
                break;
            case 7:
                for (r3y = 0, y = 0; y < width; y++, r3y++) {
                    if (r3y == 3) r3y = 0;
                    for (r3x = 0, x = 0; x < width; x++, r3x++) {
                        if (r3x == 3) r3x = 0;
                        if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                    }
                }
                break;
        }
        return;
    }

    // Badness coefficients.
    var N1 = 3,
        N2 = 3,
        N3 = 40,
        N4 = 10;

    // Using the table of the length of each run, calculate the amount of bad image 
    // - long runs or those that look like finders; called twice, once each for X and Y
    function badruns(length) {
        var i;
        var runsbad = 0;
        for (i = 0; i <= length; i++) {
            if (rlens[i] >= 5) runsbad += N1 + rlens[i] - 5;
        } // BwBBBwB as in finder
        for (i = 3; i < length - 1; i += 2) {
            if (rlens[i - 2] == rlens[i + 2] && rlens[i + 2] == rlens[i - 1] && rlens[i - 1] == rlens[i + 1] && rlens[i - 1] * 3 == rlens[i]
            // white around the black pattern? Not part of spec
            && (rlens[i - 3] == 0 // beginning
            || i + 3 > length // end
            || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4)) runsbad += N3;
        }return runsbad;
    }

    // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
    function badcheck() {
        var x, y, h, b, b1;
        var thisbad = 0;
        var bw = 0;

        // blocks of same color.
        for (y = 0; y < width - 1; y++) {
            for (x = 0; x < width - 1; x++) {
                if (qrframe[x + width * y] && qrframe[x + 1 + width * y] && qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
                !(qrframe[x + width * y] || qrframe[x + 1 + width * y] || qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
                    thisbad += N2;
            }
        } // X runs
        for (y = 0; y < width; y++) {
            rlens[0] = 0;
            for (h = b = x = 0; x < width; x++) {
                if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
                b = b1;
                bw += b ? 1 : -1;
            }
            thisbad += badruns(h);
        }

        // black/white imbalance
        if (bw < 0) bw = -bw;

        var big = bw;
        var count = 0;
        big += big << 2;
        big <<= 1;
        while (big > width * width) {
            big -= width * width, count++;
        }thisbad += count * N4;

        // Y runs
        for (x = 0; x < width; x++) {
            rlens[0] = 0;
            for (h = b = y = 0; y < width; y++) {
                if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
                b = b1;
            }
            thisbad += badruns(h);
        }
        return thisbad;
    }

    function genframe(instring) {
        var x, y, k, t, v, i, j, m;

        // find the smallest version that fits the string
        t = instring.length;
        version = 0;
        do {
            version++;
            k = (ecclevel - 1) * 4 + (version - 1) * 16;
            neccblk1 = eccblocks[k++];
            neccblk2 = eccblocks[k++];
            datablkw = eccblocks[k++];
            eccblkwid = eccblocks[k];
            k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
            if (t <= k) break;
        } while (version < 40);

        // FIXME - insure that it fits insted of being truncated
        width = 17 + 4 * version;

        // allocate, clear and setup data structures
        v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
        for (t = 0; t < v; t++) {
            eccbuf[t] = 0;
        }strinbuf = instring.slice(0);

        for (t = 0; t < width * width; t++) {
            qrframe[t] = 0;
        }for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
            framask[t] = 0;
        } // insert finders - black to frame, white to mask
        for (t = 0; t < 3; t++) {
            k = 0;
            y = 0;
            if (t == 1) k = width - 7;
            if (t == 2) y = width - 7;
            qrframe[y + 3 + width * (k + 3)] = 1;
            for (x = 0; x < 6; x++) {
                qrframe[y + x + width * k] = 1;
                qrframe[y + width * (k + x + 1)] = 1;
                qrframe[y + 6 + width * (k + x)] = 1;
                qrframe[y + x + 1 + width * (k + 6)] = 1;
            }
            for (x = 1; x < 5; x++) {
                setmask(y + x, k + 1);
                setmask(y + 1, k + x + 1);
                setmask(y + 5, k + x);
                setmask(y + x + 1, k + 5);
            }
            for (x = 2; x < 4; x++) {
                qrframe[y + x + width * (k + 2)] = 1;
                qrframe[y + 2 + width * (k + x + 1)] = 1;
                qrframe[y + 4 + width * (k + x)] = 1;
                qrframe[y + x + 1 + width * (k + 4)] = 1;
            }
        }

        // alignment blocks
        if (version > 1) {
            t = adelta[version];
            y = width - 7;
            for (;;) {
                x = width - 7;
                while (x > t - 3) {
                    putalign(x, y);
                    if (x < t) break;
                    x -= t;
                }
                if (y <= t + 9) break;
                y -= t;
                putalign(6, y);
                putalign(y, 6);
            }
        }

        // single black
        qrframe[8 + width * (width - 8)] = 1;

        // timing gap - mask only
        for (y = 0; y < 7; y++) {
            setmask(7, y);
            setmask(width - 8, y);
            setmask(7, y + width - 7);
        }
        for (x = 0; x < 8; x++) {
            setmask(x, 7);
            setmask(x + width - 8, 7);
            setmask(x, width - 8);
        }

        // reserve mask-format area
        for (x = 0; x < 9; x++) {
            setmask(x, 8);
        }for (x = 0; x < 8; x++) {
            setmask(x + width - 8, 8);
            setmask(8, x);
        }
        for (y = 0; y < 7; y++) {
            setmask(8, y + width - 7);
        } // timing row/col
        for (x = 0; x < width - 14; x++) {
            if (x & 1) {
                setmask(8 + x, 6);
                setmask(6, 8 + x);
            } else {
                qrframe[8 + x + width * 6] = 1;
                qrframe[6 + width * (8 + x)] = 1;
            }
        } // version block
        if (version > 6) {
            t = vpat[version - 7];
            k = 17;
            for (x = 0; x < 6; x++) {
                for (y = 0; y < 3; y++, k--) {
                    if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
                        qrframe[5 - x + width * (2 - y + width - 11)] = 1;
                        qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
                    } else {
                        setmask(5 - x, 2 - y + width - 11);
                        setmask(2 - y + width - 11, 5 - x);
                    }
                }
            }
        }

        // sync mask bits - only set above for white spaces, so add in black bits
        for (y = 0; y < width; y++) {
            for (x = 0; x <= y; x++) {
                if (qrframe[x + width * y]) setmask(x, y);
            }
        } // convert string to bitstream
        // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
        v = strinbuf.length;

        // string to array
        for (i = 0; i < v; i++) {
            eccbuf[i] = strinbuf.charCodeAt(i);
        }strinbuf = eccbuf.slice(0);

        // calculate max string length
        x = datablkw * (neccblk1 + neccblk2) + neccblk2;
        if (v >= x - 2) {
            v = x - 2;
            if (version > 9) v--;
        }

        // shift and repack to insert length prefix
        i = v;
        if (version > 9) {
            strinbuf[i + 2] = 0;
            strinbuf[i + 3] = 0;
            while (i--) {
                t = strinbuf[i];
                strinbuf[i + 3] |= 255 & t << 4;
                strinbuf[i + 2] = t >> 4;
            }
            strinbuf[2] |= 255 & v << 4;
            strinbuf[1] = v >> 4;
            strinbuf[0] = 0x40 | v >> 12;
        } else {
            strinbuf[i + 1] = 0;
            strinbuf[i + 2] = 0;
            while (i--) {
                t = strinbuf[i];
                strinbuf[i + 2] |= 255 & t << 4;
                strinbuf[i + 1] = t >> 4;
            }
            strinbuf[1] |= 255 & v << 4;
            strinbuf[0] = 0x40 | v >> 4;
        }
        // fill to end with pad pattern
        i = v + 3 - (version < 10);
        while (i < x) {
            strinbuf[i++] = 0xec;
            // buffer has room    if (i == x)      break;
            strinbuf[i++] = 0x11;
        }

        // calculate and append ECC

        // calculate generator polynomial
        genpoly[0] = 1;
        for (i = 0; i < eccblkwid; i++) {
            genpoly[i + 1] = 1;
            for (j = i; j > 0; j--) {
                genpoly[j] = genpoly[j] ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];
            }genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
        }
        for (i = 0; i <= eccblkwid; i++) {
            genpoly[i] = glog[genpoly[i]];
        } // use logs for genpoly[] to save calc step

        // append ecc to data buffer
        k = x;
        y = 0;
        for (i = 0; i < neccblk1; i++) {
            appendrs(y, datablkw, k, eccblkwid);
            y += datablkw;
            k += eccblkwid;
        }
        for (i = 0; i < neccblk2; i++) {
            appendrs(y, datablkw + 1, k, eccblkwid);
            y += datablkw + 1;
            k += eccblkwid;
        }
        // interleave blocks
        y = 0;
        for (i = 0; i < datablkw; i++) {
            for (j = 0; j < neccblk1; j++) {
                eccbuf[y++] = strinbuf[i + j * datablkw];
            }for (j = 0; j < neccblk2; j++) {
                eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
            }
        }
        for (j = 0; j < neccblk2; j++) {
            eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
        }for (i = 0; i < eccblkwid; i++) {
            for (j = 0; j < neccblk1 + neccblk2; j++) {
                eccbuf[y++] = strinbuf[x + i + j * eccblkwid];
            }
        }strinbuf = eccbuf;

        // pack bits into frame avoiding masked area.
        x = y = width - 1;
        k = v = 1; // up, minus
        /* inteleaved data and ecc codes */
        m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
        for (i = 0; i < m; i++) {
            t = strinbuf[i];
            for (j = 0; j < 8; j++, t <<= 1) {
                if (0x80 & t) qrframe[x + width * y] = 1;
                do {
                    // find next fill position
                    if (v) x--;else {
                        x++;
                        if (k) {
                            if (y != 0) y--;else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y = 9;
                                }
                            }
                        } else {
                            if (y != width - 1) y++;else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y -= 8;
                                }
                            }
                        }
                    }
                    v = !v;
                } while (ismasked(x, y));
            }
        }

        // save pre-mask copy of frame
        strinbuf = qrframe.slice(0);
        t = 0; // best
        y = 30000; // demerit
        // for instead of while since in original arduino code
        // if an early mask was "good enough" it wouldn't try for a better one
        // since they get more complex and take longer.
        for (k = 0; k < 8; k++) {
            applymask(k); // returns black-white imbalance
            x = badcheck();
            if (x < y) {
                // current mask better than previous best?
                y = x;
                t = k;
            }
            if (t == 7) break; // don't increment i to a void redoing mask
            qrframe = strinbuf.slice(0); // reset for next pass
        }
        if (t != k) // redo best mask - none good enough, last wasn't t
            applymask(t);

        // add in final mask/ecclevel bytes
        y = fmtword[t + (ecclevel - 1 << 3)];
        // low byte
        for (k = 0; k < 8; k++, y >>= 1) {
            if (y & 1) {
                qrframe[width - 1 - k + width * 8] = 1;
                if (k < 6) qrframe[8 + width * k] = 1;else qrframe[8 + width * (k + 1)] = 1;
            }
        } // high byte
        for (k = 0; k < 7; k++, y >>= 1) {
            if (y & 1) {
                qrframe[8 + width * (width - 7 + k)] = 1;
                if (k) qrframe[6 - k + width * 8] = 1;else qrframe[7 + width * 8] = 1;
            }
        } // return image
        return qrframe;
    }

    var _canvas = null,
        _size = null;

    var api = {

        get ecclevel() {
            return ecclevel;
        },

        set ecclevel(val) {
            ecclevel = val;
        },

        get size() {
            return _size;
        },

        set size(val) {
            _size = val;
        },

        get canvas() {
            return _canvas;
        },

        set canvas(el) {
            _canvas = el;
        },

        getFrame: function getFrame(string) {
            return genframe(string);
        },

        draw: function draw(string, canvas, size, ecc) {

            ecclevel = ecc || ecclevel;
            canvas = canvas || _canvas;

            if (!canvas) {
                console.warn('No canvas provided to draw QR code in!');
                return;
            }

            size = size || _size || Math.min(canvas.width, canvas.height);

            var frame = genframe(string),
                ctx = canvas.ctx,
                px = Math.round(size / (width + 8));

            var roundedSize = px * (width + 8),
                offset = Math.floor((size - roundedSize) / 2);

            size = roundedSize;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.setFillStyle('#000000');

            for (var i = 0; i < width; i++) {
                for (var j = 0; j < width; j++) {
                    if (frame[j * width + i]) {
                        ctx.fillRect(px * (4 + i) + offset, px * (4 + j) + offset, px, px);
                    }
                }
            }
            ctx.draw();
        }
    };

    module.exports = {
        api: api
    };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJRUiIsImFkZWx0YSIsInZwYXQiLCJmbXR3b3JkIiwiZWNjYmxvY2tzIiwiZ2xvZyIsImdleHAiLCJzdHJpbmJ1ZiIsImVjY2J1ZiIsInFyZnJhbWUiLCJmcmFtYXNrIiwicmxlbnMiLCJ2ZXJzaW9uIiwid2lkdGgiLCJuZWNjYmxrMSIsIm5lY2NibGsyIiwiZGF0YWJsa3ciLCJlY2NibGt3aWQiLCJlY2NsZXZlbCIsInNldG1hc2siLCJ4IiwieSIsImJ0IiwicHV0YWxpZ24iLCJqIiwibW9kbm4iLCJnZW5wb2x5IiwiYXBwZW5kcnMiLCJkYXRhIiwiZGxlbiIsImVjYnVmIiwiZWNsZW4iLCJpIiwiZmIiLCJpc21hc2tlZCIsImFwcGx5bWFzayIsIm0iLCJyM3giLCJyM3kiLCJOMSIsIk4yIiwiTjMiLCJONCIsImJhZHJ1bnMiLCJsZW5ndGgiLCJydW5zYmFkIiwiYmFkY2hlY2siLCJoIiwiYiIsImIxIiwidGhpc2JhZCIsImJ3IiwiYmlnIiwiY291bnQiLCJnZW5mcmFtZSIsImluc3RyaW5nIiwiayIsInQiLCJ2Iiwic2xpY2UiLCJjaGFyQ29kZUF0IiwiX2NhbnZhcyIsIl9zaXplIiwiYXBpIiwidmFsIiwic2l6ZSIsImNhbnZhcyIsImVsIiwiZ2V0RnJhbWUiLCJzdHJpbmciLCJkcmF3IiwiZWNjIiwiY29uc29sZSIsIndhcm4iLCJNYXRoIiwibWluIiwiaGVpZ2h0IiwiZnJhbWUiLCJjdHgiLCJweCIsInJvdW5kIiwicm91bmRlZFNpemUiLCJvZmZzZXQiLCJmbG9vciIsImNsZWFyUmVjdCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxLQUFNLFlBQVk7O0FBRWxCO0FBQ0EsUUFBSUMsU0FBUyxDQUNYLENBRFcsRUFDUixFQURRLEVBQ0osRUFESSxFQUNBLEVBREEsRUFDSSxFQURKLEVBQ1EsRUFEUixFQUNZLEVBRFosRUFDZ0I7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Q0FGVDs7QUFJQSxnQkFBSW9FLGNBQWNGLE1BQU1sRSxRQUFRLENBQWQsQ0FBbEI7QUFBQSxnQkFDSXFFLFNBQVNSLEtBQUtTLEtBQUwsQ0FBVyxDQUFDbEIsT0FBT2dCLFdBQVIsSUFBdUIsQ0FBbEMsQ0FEYjs7QUFHQWhCLG1CQUFPZ0IsV0FBUDs7QUFFQUgsZ0JBQUlNLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CbEIsT0FBT3JELEtBQTNCLEVBQWtDcUQsT0FBT1UsTUFBekM7QUFDQUUsZ0JBQUlPLFlBQUosQ0FBaUIsU0FBakI7O0FBRUEsaUJBQUssSUFBSXJELElBQUksQ0FBYixFQUFnQkEsSUFBSW5CLEtBQXBCLEVBQTJCbUIsR0FBM0IsRUFBZ0M7QUFDNUIscUJBQUssSUFBSVIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJWCxLQUFwQixFQUEyQlcsR0FBM0IsRUFBZ0M7QUFDNUIsd0JBQUlxRCxNQUFNckQsSUFBSVgsS0FBSixHQUFZbUIsQ0FBbEIsQ0FBSixFQUEwQjtBQUN0QjhDLDRCQUFJUSxRQUFKLENBQWFQLE1BQU0sSUFBSS9DLENBQVYsSUFBZWtELE1BQTVCLEVBQW9DSCxNQUFNLElBQUl2RCxDQUFWLElBQWUwRCxNQUFuRCxFQUEyREgsRUFBM0QsRUFBK0RBLEVBQS9EO0FBQ0g7QUFDSjtBQUNKO0FBQ0RELGdCQUFJUixJQUFKO0FBQ0g7QUE5REssS0FBVjs7QUFpRUFpQixXQUFPQyxPQUFQLEdBQWlCO0FBQ2J6QixhQUFLQTtBQURRLEtBQWpCO0FBSUgsQ0F6d0JRLEVBQVQiLCJmaWxlIjoicXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFFSID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBhbGlnbm1lbnQgcGF0dGVyblxyXG4gICAgdmFyIGFkZWx0YSA9IFtcclxuICAgICAgMCwgMTEsIDE1LCAxOSwgMjMsIDI3LCAzMSwgLy8gZm9yY2UgMSBwYXRcclxuICAgICAgMTYsIDE4LCAyMCwgMjIsIDI0LCAyNiwgMjgsIDIwLCAyMiwgMjQsIDI0LCAyNiwgMjgsIDI4LCAyMiwgMjQsIDI0LFxyXG4gICAgICAyNiwgMjYsIDI4LCAyOCwgMjQsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjgsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjhcclxuICAgICAgXTtcclxuXHJcbiAgICAvLyB2ZXJzaW9uIGJsb2NrXHJcbiAgICB2YXIgdnBhdCA9IFtcclxuICAgICAgICAweGM5NCwgMHg1YmMsIDB4YTk5LCAweDRkMywgMHhiZjYsIDB4NzYyLCAweDg0NywgMHg2MGQsXHJcbiAgICAgICAgMHg5MjgsIDB4Yjc4LCAweDQ1ZCwgMHhhMTcsIDB4NTMyLCAweDlhNiwgMHg2ODMsIDB4OGM5LFxyXG4gICAgICAgIDB4N2VjLCAweGVjNCwgMHgxZTEsIDB4ZmFiLCAweDA4ZSwgMHhjMWEsIDB4MzNmLCAweGQ3NSxcclxuICAgICAgICAweDI1MCwgMHg5ZDUsIDB4NmYwLCAweDhiYSwgMHg3OWYsIDB4YjBiLCAweDQyZSwgMHhhNjQsXHJcbiAgICAgICAgMHg1NDEsIDB4YzY5XHJcbiAgICBdO1xyXG5cclxuICAgIC8vIGZpbmFsIGZvcm1hdCBiaXRzIHdpdGggbWFzazogbGV2ZWwgPDwgMyB8IG1hc2tcclxuICAgIHZhciBmbXR3b3JkID0gW1xyXG4gICAgICAgIDB4NzdjNCwgMHg3MmYzLCAweDdkYWEsIDB4Nzg5ZCwgMHg2NjJmLCAweDYzMTgsIDB4NmM0MSwgMHg2OTc2LCAgICAvL0xcclxuICAgICAgICAweDU0MTIsIDB4NTEyNSwgMHg1ZTdjLCAweDViNGIsIDB4NDVmOSwgMHg0MGNlLCAweDRmOTcsIDB4NGFhMCwgICAgLy9NXHJcbiAgICAgICAgMHgzNTVmLCAweDMwNjgsIDB4M2YzMSwgMHgzYTA2LCAweDI0YjQsIDB4MjE4MywgMHgyZWRhLCAweDJiZWQsICAgIC8vUVxyXG4gICAgICAgIDB4MTY4OSwgMHgxM2JlLCAweDFjZTcsIDB4MTlkMCwgMHgwNzYyLCAweDAyNTUsIDB4MGQwYywgMHgwODNiICAgIC8vSFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyA0IHBlciB2ZXJzaW9uOiBudW1iZXIgb2YgYmxvY2tzIDEsMjsgZGF0YSB3aWR0aDsgZWNjIHdpZHRoXHJcbiAgICB2YXIgZWNjYmxvY2tzID0gW1xyXG4gICAgICAgIDEsIDAsIDE5LCA3LCAxLCAwLCAxNiwgMTAsIDEsIDAsIDEzLCAxMywgMSwgMCwgOSwgMTcsXHJcbiAgICAgICAgMSwgMCwgMzQsIDEwLCAxLCAwLCAyOCwgMTYsIDEsIDAsIDIyLCAyMiwgMSwgMCwgMTYsIDI4LFxyXG4gICAgICAgIDEsIDAsIDU1LCAxNSwgMSwgMCwgNDQsIDI2LCAyLCAwLCAxNywgMTgsIDIsIDAsIDEzLCAyMixcclxuICAgICAgICAxLCAwLCA4MCwgMjAsIDIsIDAsIDMyLCAxOCwgMiwgMCwgMjQsIDI2LCA0LCAwLCA5LCAxNixcclxuICAgICAgICAxLCAwLCAxMDgsIDI2LCAyLCAwLCA0MywgMjQsIDIsIDIsIDE1LCAxOCwgMiwgMiwgMTEsIDIyLFxyXG4gICAgICAgIDIsIDAsIDY4LCAxOCwgNCwgMCwgMjcsIDE2LCA0LCAwLCAxOSwgMjQsIDQsIDAsIDE1LCAyOCxcclxuICAgICAgICAyLCAwLCA3OCwgMjAsIDQsIDAsIDMxLCAxOCwgMiwgNCwgMTQsIDE4LCA0LCAxLCAxMywgMjYsXHJcbiAgICAgICAgMiwgMCwgOTcsIDI0LCAyLCAyLCAzOCwgMjIsIDQsIDIsIDE4LCAyMiwgNCwgMiwgMTQsIDI2LFxyXG4gICAgICAgIDIsIDAsIDExNiwgMzAsIDMsIDIsIDM2LCAyMiwgNCwgNCwgMTYsIDIwLCA0LCA0LCAxMiwgMjQsXHJcbiAgICAgICAgMiwgMiwgNjgsIDE4LCA0LCAxLCA0MywgMjYsIDYsIDIsIDE5LCAyNCwgNiwgMiwgMTUsIDI4LFxyXG4gICAgICAgIDQsIDAsIDgxLCAyMCwgMSwgNCwgNTAsIDMwLCA0LCA0LCAyMiwgMjgsIDMsIDgsIDEyLCAyNCxcclxuICAgICAgICAyLCAyLCA5MiwgMjQsIDYsIDIsIDM2LCAyMiwgNCwgNiwgMjAsIDI2LCA3LCA0LCAxNCwgMjgsXHJcbiAgICAgICAgNCwgMCwgMTA3LCAyNiwgOCwgMSwgMzcsIDIyLCA4LCA0LCAyMCwgMjQsIDEyLCA0LCAxMSwgMjIsXHJcbiAgICAgICAgMywgMSwgMTE1LCAzMCwgNCwgNSwgNDAsIDI0LCAxMSwgNSwgMTYsIDIwLCAxMSwgNSwgMTIsIDI0LFxyXG4gICAgICAgIDUsIDEsIDg3LCAyMiwgNSwgNSwgNDEsIDI0LCA1LCA3LCAyNCwgMzAsIDExLCA3LCAxMiwgMjQsXHJcbiAgICAgICAgNSwgMSwgOTgsIDI0LCA3LCAzLCA0NSwgMjgsIDE1LCAyLCAxOSwgMjQsIDMsIDEzLCAxNSwgMzAsXHJcbiAgICAgICAgMSwgNSwgMTA3LCAyOCwgMTAsIDEsIDQ2LCAyOCwgMSwgMTUsIDIyLCAyOCwgMiwgMTcsIDE0LCAyOCxcclxuICAgICAgICA1LCAxLCAxMjAsIDMwLCA5LCA0LCA0MywgMjYsIDE3LCAxLCAyMiwgMjgsIDIsIDE5LCAxNCwgMjgsXHJcbiAgICAgICAgMywgNCwgMTEzLCAyOCwgMywgMTEsIDQ0LCAyNiwgMTcsIDQsIDIxLCAyNiwgOSwgMTYsIDEzLCAyNixcclxuICAgICAgICAzLCA1LCAxMDcsIDI4LCAzLCAxMywgNDEsIDI2LCAxNSwgNSwgMjQsIDMwLCAxNSwgMTAsIDE1LCAyOCxcclxuICAgICAgICA0LCA0LCAxMTYsIDI4LCAxNywgMCwgNDIsIDI2LCAxNywgNiwgMjIsIDI4LCAxOSwgNiwgMTYsIDMwLFxyXG4gICAgICAgIDIsIDcsIDExMSwgMjgsIDE3LCAwLCA0NiwgMjgsIDcsIDE2LCAyNCwgMzAsIDM0LCAwLCAxMywgMjQsXHJcbiAgICAgICAgNCwgNSwgMTIxLCAzMCwgNCwgMTQsIDQ3LCAyOCwgMTEsIDE0LCAyNCwgMzAsIDE2LCAxNCwgMTUsIDMwLFxyXG4gICAgICAgIDYsIDQsIDExNywgMzAsIDYsIDE0LCA0NSwgMjgsIDExLCAxNiwgMjQsIDMwLCAzMCwgMiwgMTYsIDMwLFxyXG4gICAgICAgIDgsIDQsIDEwNiwgMjYsIDgsIDEzLCA0NywgMjgsIDcsIDIyLCAyNCwgMzAsIDIyLCAxMywgMTUsIDMwLFxyXG4gICAgICAgIDEwLCAyLCAxMTQsIDI4LCAxOSwgNCwgNDYsIDI4LCAyOCwgNiwgMjIsIDI4LCAzMywgNCwgMTYsIDMwLFxyXG4gICAgICAgIDgsIDQsIDEyMiwgMzAsIDIyLCAzLCA0NSwgMjgsIDgsIDI2LCAyMywgMzAsIDEyLCAyOCwgMTUsIDMwLFxyXG4gICAgICAgIDMsIDEwLCAxMTcsIDMwLCAzLCAyMywgNDUsIDI4LCA0LCAzMSwgMjQsIDMwLCAxMSwgMzEsIDE1LCAzMCxcclxuICAgICAgICA3LCA3LCAxMTYsIDMwLCAyMSwgNywgNDUsIDI4LCAxLCAzNywgMjMsIDMwLCAxOSwgMjYsIDE1LCAzMCxcclxuICAgICAgICA1LCAxMCwgMTE1LCAzMCwgMTksIDEwLCA0NywgMjgsIDE1LCAyNSwgMjQsIDMwLCAyMywgMjUsIDE1LCAzMCxcclxuICAgICAgICAxMywgMywgMTE1LCAzMCwgMiwgMjksIDQ2LCAyOCwgNDIsIDEsIDI0LCAzMCwgMjMsIDI4LCAxNSwgMzAsXHJcbiAgICAgICAgMTcsIDAsIDExNSwgMzAsIDEwLCAyMywgNDYsIDI4LCAxMCwgMzUsIDI0LCAzMCwgMTksIDM1LCAxNSwgMzAsXHJcbiAgICAgICAgMTcsIDEsIDExNSwgMzAsIDE0LCAyMSwgNDYsIDI4LCAyOSwgMTksIDI0LCAzMCwgMTEsIDQ2LCAxNSwgMzAsXHJcbiAgICAgICAgMTMsIDYsIDExNSwgMzAsIDE0LCAyMywgNDYsIDI4LCA0NCwgNywgMjQsIDMwLCA1OSwgMSwgMTYsIDMwLFxyXG4gICAgICAgIDEyLCA3LCAxMjEsIDMwLCAxMiwgMjYsIDQ3LCAyOCwgMzksIDE0LCAyNCwgMzAsIDIyLCA0MSwgMTUsIDMwLFxyXG4gICAgICAgIDYsIDE0LCAxMjEsIDMwLCA2LCAzNCwgNDcsIDI4LCA0NiwgMTAsIDI0LCAzMCwgMiwgNjQsIDE1LCAzMCxcclxuICAgICAgICAxNywgNCwgMTIyLCAzMCwgMjksIDE0LCA0NiwgMjgsIDQ5LCAxMCwgMjQsIDMwLCAyNCwgNDYsIDE1LCAzMCxcclxuICAgICAgICA0LCAxOCwgMTIyLCAzMCwgMTMsIDMyLCA0NiwgMjgsIDQ4LCAxNCwgMjQsIDMwLCA0MiwgMzIsIDE1LCAzMCxcclxuICAgICAgICAyMCwgNCwgMTE3LCAzMCwgNDAsIDcsIDQ3LCAyOCwgNDMsIDIyLCAyNCwgMzAsIDEwLCA2NywgMTUsIDMwLFxyXG4gICAgICAgIDE5LCA2LCAxMTgsIDMwLCAxOCwgMzEsIDQ3LCAyOCwgMzQsIDM0LCAyNCwgMzAsIDIwLCA2MSwgMTUsIDMwXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIEdhbG9pcyBmaWVsZCBsb2cgdGFibGVcclxuICAgIHZhciBnbG9nID0gW1xyXG4gICAgICAgIDB4ZmYsIDB4MDAsIDB4MDEsIDB4MTksIDB4MDIsIDB4MzIsIDB4MWEsIDB4YzYsIDB4MDMsIDB4ZGYsIDB4MzMsIDB4ZWUsIDB4MWIsIDB4NjgsIDB4YzcsIDB4NGIsXHJcbiAgICAgICAgMHgwNCwgMHg2NCwgMHhlMCwgMHgwZSwgMHgzNCwgMHg4ZCwgMHhlZiwgMHg4MSwgMHgxYywgMHhjMSwgMHg2OSwgMHhmOCwgMHhjOCwgMHgwOCwgMHg0YywgMHg3MSxcclxuICAgICAgICAweDA1LCAweDhhLCAweDY1LCAweDJmLCAweGUxLCAweDI0LCAweDBmLCAweDIxLCAweDM1LCAweDkzLCAweDhlLCAweGRhLCAweGYwLCAweDEyLCAweDgyLCAweDQ1LFxyXG4gICAgICAgIDB4MWQsIDB4YjUsIDB4YzIsIDB4N2QsIDB4NmEsIDB4MjcsIDB4ZjksIDB4YjksIDB4YzksIDB4OWEsIDB4MDksIDB4NzgsIDB4NGQsIDB4ZTQsIDB4NzIsIDB4YTYsXHJcbiAgICAgICAgMHgwNiwgMHhiZiwgMHg4YiwgMHg2MiwgMHg2NiwgMHhkZCwgMHgzMCwgMHhmZCwgMHhlMiwgMHg5OCwgMHgyNSwgMHhiMywgMHgxMCwgMHg5MSwgMHgyMiwgMHg4OCxcclxuICAgICAgICAweDM2LCAweGQwLCAweDk0LCAweGNlLCAweDhmLCAweDk2LCAweGRiLCAweGJkLCAweGYxLCAweGQyLCAweDEzLCAweDVjLCAweDgzLCAweDM4LCAweDQ2LCAweDQwLFxyXG4gICAgICAgIDB4MWUsIDB4NDIsIDB4YjYsIDB4YTMsIDB4YzMsIDB4NDgsIDB4N2UsIDB4NmUsIDB4NmIsIDB4M2EsIDB4MjgsIDB4NTQsIDB4ZmEsIDB4ODUsIDB4YmEsIDB4M2QsXHJcbiAgICAgICAgMHhjYSwgMHg1ZSwgMHg5YiwgMHg5ZiwgMHgwYSwgMHgxNSwgMHg3OSwgMHgyYiwgMHg0ZSwgMHhkNCwgMHhlNSwgMHhhYywgMHg3MywgMHhmMywgMHhhNywgMHg1NyxcclxuICAgICAgICAweDA3LCAweDcwLCAweGMwLCAweGY3LCAweDhjLCAweDgwLCAweDYzLCAweDBkLCAweDY3LCAweDRhLCAweGRlLCAweGVkLCAweDMxLCAweGM1LCAweGZlLCAweDE4LFxyXG4gICAgICAgIDB4ZTMsIDB4YTUsIDB4OTksIDB4NzcsIDB4MjYsIDB4YjgsIDB4YjQsIDB4N2MsIDB4MTEsIDB4NDQsIDB4OTIsIDB4ZDksIDB4MjMsIDB4MjAsIDB4ODksIDB4MmUsXHJcbiAgICAgICAgMHgzNywgMHgzZiwgMHhkMSwgMHg1YiwgMHg5NSwgMHhiYywgMHhjZiwgMHhjZCwgMHg5MCwgMHg4NywgMHg5NywgMHhiMiwgMHhkYywgMHhmYywgMHhiZSwgMHg2MSxcclxuICAgICAgICAweGYyLCAweDU2LCAweGQzLCAweGFiLCAweDE0LCAweDJhLCAweDVkLCAweDllLCAweDg0LCAweDNjLCAweDM5LCAweDUzLCAweDQ3LCAweDZkLCAweDQxLCAweGEyLFxyXG4gICAgICAgIDB4MWYsIDB4MmQsIDB4NDMsIDB4ZDgsIDB4YjcsIDB4N2IsIDB4YTQsIDB4NzYsIDB4YzQsIDB4MTcsIDB4NDksIDB4ZWMsIDB4N2YsIDB4MGMsIDB4NmYsIDB4ZjYsXHJcbiAgICAgICAgMHg2YywgMHhhMSwgMHgzYiwgMHg1MiwgMHgyOSwgMHg5ZCwgMHg1NSwgMHhhYSwgMHhmYiwgMHg2MCwgMHg4NiwgMHhiMSwgMHhiYiwgMHhjYywgMHgzZSwgMHg1YSxcclxuICAgICAgICAweGNiLCAweDU5LCAweDVmLCAweGIwLCAweDljLCAweGE5LCAweGEwLCAweDUxLCAweDBiLCAweGY1LCAweDE2LCAweGViLCAweDdhLCAweDc1LCAweDJjLCAweGQ3LFxyXG4gICAgICAgIDB4NGYsIDB4YWUsIDB4ZDUsIDB4ZTksIDB4ZTYsIDB4ZTcsIDB4YWQsIDB4ZTgsIDB4NzQsIDB4ZDYsIDB4ZjQsIDB4ZWEsIDB4YTgsIDB4NTAsIDB4NTgsIDB4YWZcclxuICAgIF07XHJcblxyXG4gICAgLy8gR2FsaW9zIGZpZWxkIGV4cG9uZW50IHRhYmxlXHJcbiAgICB2YXIgZ2V4cCA9IFtcclxuICAgICAgICAweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFkLCAweDNhLCAweDc0LCAweGU4LCAweGNkLCAweDg3LCAweDEzLCAweDI2LFxyXG4gICAgICAgIDB4NGMsIDB4OTgsIDB4MmQsIDB4NWEsIDB4YjQsIDB4NzUsIDB4ZWEsIDB4YzksIDB4OGYsIDB4MDMsIDB4MDYsIDB4MGMsIDB4MTgsIDB4MzAsIDB4NjAsIDB4YzAsXHJcbiAgICAgICAgMHg5ZCwgMHgyNywgMHg0ZSwgMHg5YywgMHgyNSwgMHg0YSwgMHg5NCwgMHgzNSwgMHg2YSwgMHhkNCwgMHhiNSwgMHg3NywgMHhlZSwgMHhjMSwgMHg5ZiwgMHgyMyxcclxuICAgICAgICAweDQ2LCAweDhjLCAweDA1LCAweDBhLCAweDE0LCAweDI4LCAweDUwLCAweGEwLCAweDVkLCAweGJhLCAweDY5LCAweGQyLCAweGI5LCAweDZmLCAweGRlLCAweGExLFxyXG4gICAgICAgIDB4NWYsIDB4YmUsIDB4NjEsIDB4YzIsIDB4OTksIDB4MmYsIDB4NWUsIDB4YmMsIDB4NjUsIDB4Y2EsIDB4ODksIDB4MGYsIDB4MWUsIDB4M2MsIDB4NzgsIDB4ZjAsXHJcbiAgICAgICAgMHhmZCwgMHhlNywgMHhkMywgMHhiYiwgMHg2YiwgMHhkNiwgMHhiMSwgMHg3ZiwgMHhmZSwgMHhlMSwgMHhkZiwgMHhhMywgMHg1YiwgMHhiNiwgMHg3MSwgMHhlMixcclxuICAgICAgICAweGQ5LCAweGFmLCAweDQzLCAweDg2LCAweDExLCAweDIyLCAweDQ0LCAweDg4LCAweDBkLCAweDFhLCAweDM0LCAweDY4LCAweGQwLCAweGJkLCAweDY3LCAweGNlLFxyXG4gICAgICAgIDB4ODEsIDB4MWYsIDB4M2UsIDB4N2MsIDB4ZjgsIDB4ZWQsIDB4YzcsIDB4OTMsIDB4M2IsIDB4NzYsIDB4ZWMsIDB4YzUsIDB4OTcsIDB4MzMsIDB4NjYsIDB4Y2MsXHJcbiAgICAgICAgMHg4NSwgMHgxNywgMHgyZSwgMHg1YywgMHhiOCwgMHg2ZCwgMHhkYSwgMHhhOSwgMHg0ZiwgMHg5ZSwgMHgyMSwgMHg0MiwgMHg4NCwgMHgxNSwgMHgyYSwgMHg1NCxcclxuICAgICAgICAweGE4LCAweDRkLCAweDlhLCAweDI5LCAweDUyLCAweGE0LCAweDU1LCAweGFhLCAweDQ5LCAweDkyLCAweDM5LCAweDcyLCAweGU0LCAweGQ1LCAweGI3LCAweDczLFxyXG4gICAgICAgIDB4ZTYsIDB4ZDEsIDB4YmYsIDB4NjMsIDB4YzYsIDB4OTEsIDB4M2YsIDB4N2UsIDB4ZmMsIDB4ZTUsIDB4ZDcsIDB4YjMsIDB4N2IsIDB4ZjYsIDB4ZjEsIDB4ZmYsXHJcbiAgICAgICAgMHhlMywgMHhkYiwgMHhhYiwgMHg0YiwgMHg5NiwgMHgzMSwgMHg2MiwgMHhjNCwgMHg5NSwgMHgzNywgMHg2ZSwgMHhkYywgMHhhNSwgMHg1NywgMHhhZSwgMHg0MSxcclxuICAgICAgICAweDgyLCAweDE5LCAweDMyLCAweDY0LCAweGM4LCAweDhkLCAweDA3LCAweDBlLCAweDFjLCAweDM4LCAweDcwLCAweGUwLCAweGRkLCAweGE3LCAweDUzLCAweGE2LFxyXG4gICAgICAgIDB4NTEsIDB4YTIsIDB4NTksIDB4YjIsIDB4NzksIDB4ZjIsIDB4ZjksIDB4ZWYsIDB4YzMsIDB4OWIsIDB4MmIsIDB4NTYsIDB4YWMsIDB4NDUsIDB4OGEsIDB4MDksXHJcbiAgICAgICAgMHgxMiwgMHgyNCwgMHg0OCwgMHg5MCwgMHgzZCwgMHg3YSwgMHhmNCwgMHhmNSwgMHhmNywgMHhmMywgMHhmYiwgMHhlYiwgMHhjYiwgMHg4YiwgMHgwYiwgMHgxNixcclxuICAgICAgICAweDJjLCAweDU4LCAweGIwLCAweDdkLCAweGZhLCAweGU5LCAweGNmLCAweDgzLCAweDFiLCAweDM2LCAweDZjLCAweGQ4LCAweGFkLCAweDQ3LCAweDhlLCAweDAwXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIFdvcmtpbmcgYnVmZmVyczpcclxuICAgIC8vIGRhdGEgaW5wdXQgYW5kIGVjYyBhcHBlbmQsIGltYWdlIHdvcmtpbmcgYnVmZmVyLCBmaXhlZCBwYXJ0IG9mIGltYWdlLCBydW4gbGVuZ3RocyBmb3IgYmFkbmVzc1xyXG4gICAgdmFyIHN0cmluYnVmPVtdLCBlY2NidWY9W10sIHFyZnJhbWU9W10sIGZyYW1hc2s9W10sIHJsZW5zPVtdOyBcclxuICAgIC8vIENvbnRyb2wgdmFsdWVzIC0gd2lkdGggaXMgYmFzZWQgb24gdmVyc2lvbiwgbGFzdCA0IGFyZSBmcm9tIHRhYmxlLlxyXG4gICAgdmFyIHZlcnNpb24sIHdpZHRoLCBuZWNjYmxrMSwgbmVjY2JsazIsIGRhdGFibGt3LCBlY2NibGt3aWQ7XHJcbiAgICB2YXIgZWNjbGV2ZWwgPSAyO1xyXG4gICAgLy8gc2V0IGJpdCB0byBpbmRpY2F0ZSBjZWxsIGluIHFyZnJhbWUgaXMgaW1tdXRhYmxlLiAgc3ltbWV0cmljIGFyb3VuZCBkaWFnb25hbFxyXG4gICAgZnVuY3Rpb24gc2V0bWFzayh4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidDtcclxuICAgICAgICBpZiAoeCA+IHkpIHtcclxuICAgICAgICAgICAgYnQgPSB4O1xyXG4gICAgICAgICAgICB4ID0geTtcclxuICAgICAgICAgICAgeSA9IGJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB5KnkgPSAxKzMrNS4uLlxyXG4gICAgICAgIGJ0ID0geTtcclxuICAgICAgICBidCAqPSB5O1xyXG4gICAgICAgIGJ0ICs9IHk7XHJcbiAgICAgICAgYnQgPj49IDE7XHJcbiAgICAgICAgYnQgKz0geDtcclxuICAgICAgICBmcmFtYXNrW2J0XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW50ZXIgYWxpZ25tZW50IHBhdHRlcm4gLSBibGFjayB0byBxcmZyYW1lLCB3aGl0ZSB0byBtYXNrIChsYXRlciBibGFjayBmcmFtZSBtZXJnZWQgdG8gbWFzaylcclxuICAgIGZ1bmN0aW9uIHB1dGFsaWduKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGo7XHJcblxyXG4gICAgICAgIHFyZnJhbWVbeCArIHdpZHRoICogeV0gPSAxO1xyXG4gICAgICAgIGZvciAoaiA9IC0yOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgICAgIHFyZnJhbWVbKHggKyBqKSArIHdpZHRoICogKHkgLSAyKV0gPSAxO1xyXG4gICAgICAgICAgICBxcmZyYW1lWyh4IC0gMikgKyB3aWR0aCAqICh5ICsgaiArIDEpXSA9IDE7XHJcbiAgICAgICAgICAgIHFyZnJhbWVbKHggKyAyKSArIHdpZHRoICogKHkgKyBqKV0gPSAxO1xyXG4gICAgICAgICAgICBxcmZyYW1lWyh4ICsgaiArIDEpICsgd2lkdGggKiAoeSArIDIpXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCAyOyBqKyspIHtcclxuICAgICAgICAgICAgc2V0bWFzayh4IC0gMSwgeSArIGopO1xyXG4gICAgICAgICAgICBzZXRtYXNrKHggKyAxLCB5IC0gaik7XHJcbiAgICAgICAgICAgIHNldG1hc2soeCAtIGosIHkgLSAxKTtcclxuICAgICAgICAgICAgc2V0bWFzayh4ICsgaiwgeSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUmVlZCBTb2xvbW9uIGVycm9yIGNvcnJlY3Rpb25cclxuICAgIC8vIGV4cG9uZW50aWF0aW9uIG1vZCBOXHJcbiAgICBmdW5jdGlvbiBtb2Rubih4KVxyXG4gICAge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDI1NSkge1xyXG4gICAgICAgICAgICB4IC09IDI1NTtcclxuICAgICAgICAgICAgeCA9ICh4ID4+IDgpICsgKHggJiAyNTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZ2VucG9seSA9IFtdO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQyBkYXRhIHRvIGRhdGEgYmxvY2suICBCbG9jayBpcyBpbiBzdHJpbmJ1ZiwgaW5kZXhlcyB0byBidWZmZXJzIGdpdmVuLlxyXG4gICAgZnVuY3Rpb24gYXBwZW5kcnMoZGF0YSwgZGxlbiwgZWNidWYsIGVjbGVuKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpLCBqLCBmYjtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVjbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHN0cmluYnVmW2VjYnVmICsgaV0gPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgZmIgPSBnbG9nW3N0cmluYnVmW2RhdGEgKyBpXSBeIHN0cmluYnVmW2VjYnVmXV07XHJcbiAgICAgICAgICAgIGlmIChmYiAhPSAyNTUpICAgICAvKiBmYiB0ZXJtIGlzIG5vbi16ZXJvICovXHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAxOyBqIDwgZWNsZW47IGorKylcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmJ1ZltlY2J1ZiArIGogLSAxXSA9IHN0cmluYnVmW2VjYnVmICsgal0gXiBnZXhwW21vZG5uKGZiICsgZ2VucG9seVtlY2xlbiAtIGpdKV07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZvciggaiA9IGVjYnVmIDsgaiA8IGVjYnVmICsgZWNsZW47IGorKyApXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5idWZbal0gPSBzdHJpbmJ1ZltqICsgMV07XHJcbiAgICAgICAgICAgIHN0cmluYnVmWyBlY2J1ZiArIGVjbGVuIC0gMV0gPSBmYiA9PSAyNTUgPyAwIDogZ2V4cFttb2RubihmYiArIGdlbnBvbHlbMF0pXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIEZyYW1lIGRhdGEgaW5zZXJ0IGZvbGxvd2luZyB0aGUgcGF0aCBydWxlc1xyXG5cclxuICAgIC8vIGNoZWNrIG1hc2sgLSBzaW5jZSBzeW1tZXRyaWNhbCB1c2UgaGFsZi5cclxuICAgIGZ1bmN0aW9uIGlzbWFza2VkKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGJ0O1xyXG4gICAgICAgIGlmICh4ID4geSkge1xyXG4gICAgICAgICAgICBidCA9IHg7XHJcbiAgICAgICAgICAgIHggPSB5O1xyXG4gICAgICAgICAgICB5ID0gYnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ0ID0geTtcclxuICAgICAgICBidCArPSB5ICogeTtcclxuICAgICAgICBidCA+Pj0gMTtcclxuICAgICAgICBidCArPSB4O1xyXG4gICAgICAgIHJldHVybiBmcmFtYXNrW2J0XTtcclxuICAgIH1cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gIEFwcGx5IHRoZSBzZWxlY3RlZCBtYXNrIG91dCBvZiB0aGUgOC5cclxuICAgIGZ1bmN0aW9uICBhcHBseW1hc2sobSlcclxuICAgIHtcclxuICAgICAgICB2YXIgeCwgeSwgcjN4LCByM3k7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISgoeCArIHkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh5ICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyM3ggJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KyssIHIzeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocjN5ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgcjN5ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAocjN4ID0gcjN5LCB4ID0gMDsgeCA8IHdpZHRoOyB4KyssIHIzeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcjN4ICYmICFpc21hc2tlZCh4LCB5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHIzeSA9ICgoeSA+PiAxKSAmIDEpLCB4ID0gMDsgeCA8IHdpZHRoOyB4KyssIHIzeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeSA9ICFyM3k7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcjN5ICYmICFpc21hc2tlZCh4LCB5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrLCByM3krKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHIzeSA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHIzeSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoKHggJiB5ICYgMSkgKyAhKCFyM3ggfCAhcjN5KSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBmb3IgKHIzeSA9IDAsIHkgPSAwOyB5IDwgd2lkdGg7IHkrKywgcjN5KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyM3kgPT0gMylcclxuICAgICAgICAgICAgICAgICAgICByM3kgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KyssIHIzeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKCgoeCAmIHkgJiAxKSArIChyM3ggJiYgKHIzeCA9PSByM3kpKSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrLCByM3krKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHIzeSA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHIzeSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoKChyM3ggJiYgKHIzeCA9PSByM3kpKSArICgoeCArIHkpICYgMSkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWRuZXNzIGNvZWZmaWNpZW50cy5cclxuICAgIHZhciBOMSA9IDMsIE4yID0gMywgTjMgPSA0MCwgTjQgPSAxMDtcclxuXHJcbiAgICAvLyBVc2luZyB0aGUgdGFibGUgb2YgdGhlIGxlbmd0aCBvZiBlYWNoIHJ1biwgY2FsY3VsYXRlIHRoZSBhbW91bnQgb2YgYmFkIGltYWdlIFxyXG4gICAgLy8gLSBsb25nIHJ1bnMgb3IgdGhvc2UgdGhhdCBsb29rIGxpa2UgZmluZGVyczsgY2FsbGVkIHR3aWNlLCBvbmNlIGVhY2ggZm9yIFggYW5kIFlcclxuICAgIGZ1bmN0aW9uIGJhZHJ1bnMobGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBydW5zYmFkID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IGxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBpZiAocmxlbnNbaV0gPj0gNSlcclxuICAgICAgICAgICAgICAgIHJ1bnNiYWQgKz0gTjEgKyBybGVuc1tpXSAtIDU7XHJcbiAgICAgICAgLy8gQndCQkJ3QiBhcyBpbiBmaW5kZXJcclxuICAgICAgICBmb3IgKGkgPSAzOyBpIDwgbGVuZ3RoIC0gMTsgaSArPSAyKVxyXG4gICAgICAgICAgICBpZiAocmxlbnNbaSAtIDJdID09IHJsZW5zW2kgKyAyXVxyXG4gICAgICAgICAgICAgICAgJiYgcmxlbnNbaSArIDJdID09IHJsZW5zW2kgLSAxXVxyXG4gICAgICAgICAgICAgICAgJiYgcmxlbnNbaSAtIDFdID09IHJsZW5zW2kgKyAxXVxyXG4gICAgICAgICAgICAgICAgJiYgcmxlbnNbaSAtIDFdICogMyA9PSBybGVuc1tpXVxyXG4gICAgICAgICAgICAgICAgLy8gd2hpdGUgYXJvdW5kIHRoZSBibGFjayBwYXR0ZXJuPyBOb3QgcGFydCBvZiBzcGVjXHJcbiAgICAgICAgICAgICAgICAmJiAocmxlbnNbaSAtIDNdID09IDAgLy8gYmVnaW5uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgaSArIDMgPiBsZW5ndGggIC8vIGVuZFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHJsZW5zW2kgLSAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0IHx8IHJsZW5zW2kgKyAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0KVxyXG4gICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBydW5zYmFkICs9IE4zO1xyXG4gICAgICAgIHJldHVybiBydW5zYmFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBob3cgYmFkIHRoZSBtYXNrZWQgaW1hZ2UgaXMgLSBibG9ja3MsIGltYmFsYW5jZSwgcnVucywgb3IgZmluZGVycy5cclxuICAgIGZ1bmN0aW9uIGJhZGNoZWNrKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeCwgeSwgaCwgYiwgYjE7XHJcbiAgICAgICAgdmFyIHRoaXNiYWQgPSAwO1xyXG4gICAgICAgIHZhciBidyA9IDA7XHJcblxyXG4gICAgICAgIC8vIGJsb2NrcyBvZiBzYW1lIGNvbG9yLlxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aCAtIDE7IHkrKylcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTsgeCsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKChxcmZyYW1lW3ggKyB3aWR0aCAqIHldICYmIHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogeV1cclxuICAgICAgICAgICAgICAgICAgICAgJiYgcXJmcmFtZVt4ICsgd2lkdGggKiAoeSArIDEpXSAmJiBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqICh5ICsgMSldKSAvLyBhbGwgYmxhY2tcclxuICAgICAgICAgICAgICAgICAgICB8fCAhKHFyZnJhbWVbeCArIHdpZHRoICogeV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiB5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfHwgcXJmcmFtZVt4ICsgd2lkdGggKiAoeSArIDEpXSB8fCBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqICh5ICsgMSldKSkgLy8gYWxsIHdoaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc2JhZCArPSBOMjtcclxuXHJcbiAgICAgICAgLy8gWCBydW5zXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcclxuICAgICAgICAgICAgcmxlbnNbMF0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGggPSBiID0geCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcclxuICAgICAgICAgICAgICAgICAgICBybGVuc1toXSsrO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJsZW5zWysraF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgYiA9IGIxO1xyXG4gICAgICAgICAgICAgICAgYncgKz0gYiA/IDEgOiAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzYmFkICs9IGJhZHJ1bnMoaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBibGFjay93aGl0ZSBpbWJhbGFuY2VcclxuICAgICAgICBpZiAoYncgPCAwKVxyXG4gICAgICAgICAgICBidyA9IC1idztcclxuXHJcbiAgICAgICAgdmFyIGJpZyA9IGJ3O1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgYmlnICs9IGJpZyA8PCAyO1xyXG4gICAgICAgIGJpZyA8PD0gMTtcclxuICAgICAgICB3aGlsZSAoYmlnID4gd2lkdGggKiB3aWR0aClcclxuICAgICAgICAgICAgYmlnIC09IHdpZHRoICogd2lkdGgsIGNvdW50Kys7XHJcbiAgICAgICAgdGhpc2JhZCArPSBjb3VudCAqIE40O1xyXG5cclxuICAgICAgICAvLyBZIHJ1bnNcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBybGVuc1swXSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaCA9IGIgPSB5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICgoYjEgPSBxcmZyYW1lW3ggKyB3aWR0aCAqIHldKSA9PSBiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJsZW5zW2hdKys7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmxlbnNbKytoXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBiID0gYjE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpc2JhZCArPSBiYWRydW5zKGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc2JhZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZW5mcmFtZShpbnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB2YXIgeCwgeSwgaywgdCwgdiwgaSwgaiwgbTtcclxuXHJcbiAgICAvLyBmaW5kIHRoZSBzbWFsbGVzdCB2ZXJzaW9uIHRoYXQgZml0cyB0aGUgc3RyaW5nXHJcbiAgICAgICAgdCA9IGluc3RyaW5nLmxlbmd0aDtcclxuICAgICAgICB2ZXJzaW9uID0gMDtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIHZlcnNpb24rKztcclxuICAgICAgICAgICAgayA9IChlY2NsZXZlbCAtIDEpICogNCArICh2ZXJzaW9uIC0gMSkgKiAxNjtcclxuICAgICAgICAgICAgbmVjY2JsazEgPSBlY2NibG9ja3NbaysrXTtcclxuICAgICAgICAgICAgbmVjY2JsazIgPSBlY2NibG9ja3NbaysrXTtcclxuICAgICAgICAgICAgZGF0YWJsa3cgPSBlY2NibG9ja3NbaysrXTtcclxuICAgICAgICAgICAgZWNjYmxrd2lkID0gZWNjYmxvY2tzW2tdO1xyXG4gICAgICAgICAgICBrID0gZGF0YWJsa3cgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMiAtIDMgKyAodmVyc2lvbiA8PSA5KTtcclxuICAgICAgICAgICAgaWYgKHQgPD0gaylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gd2hpbGUgKHZlcnNpb24gPCA0MCk7XHJcblxyXG4gICAgLy8gRklYTUUgLSBpbnN1cmUgdGhhdCBpdCBmaXRzIGluc3RlZCBvZiBiZWluZyB0cnVuY2F0ZWRcclxuICAgICAgICB3aWR0aCA9IDE3ICsgNCAqIHZlcnNpb247XHJcblxyXG4gICAgLy8gYWxsb2NhdGUsIGNsZWFyIGFuZCBzZXR1cCBkYXRhIHN0cnVjdHVyZXNcclxuICAgICAgICB2ID0gZGF0YWJsa3cgKyAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XHJcbiAgICAgICAgZm9yKCB0ID0gMDsgdCA8IHY7IHQrKyApXHJcbiAgICAgICAgICAgIGVjY2J1Zlt0XSA9IDA7XHJcbiAgICAgICAgc3RyaW5idWYgPSBpbnN0cmluZy5zbGljZSgwKTtcclxuXHJcbiAgICAgICAgZm9yKCB0ID0gMDsgdCA8IHdpZHRoICogd2lkdGg7IHQrKyApXHJcbiAgICAgICAgICAgIHFyZnJhbWVbdF0gPSAwO1xyXG5cclxuICAgICAgICBmb3IoIHQgPSAwIDsgdCA8ICh3aWR0aCAqICh3aWR0aCArIDEpICsgMSkgLyAyOyB0KyspXHJcbiAgICAgICAgICAgIGZyYW1hc2tbdF0gPSAwO1xyXG5cclxuICAgIC8vIGluc2VydCBmaW5kZXJzIC0gYmxhY2sgdG8gZnJhbWUsIHdoaXRlIHRvIG1hc2tcclxuICAgICAgICBmb3IgKHQgPSAwOyB0IDwgMzsgdCsrKSB7XHJcbiAgICAgICAgICAgIGsgPSAwO1xyXG4gICAgICAgICAgICB5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHQgPT0gMSlcclxuICAgICAgICAgICAgICAgIGsgPSAod2lkdGggLSA3KTtcclxuICAgICAgICAgICAgaWYgKHQgPT0gMilcclxuICAgICAgICAgICAgICAgIHkgPSAod2lkdGggLSA3KTtcclxuICAgICAgICAgICAgcXJmcmFtZVsoeSArIDMpICsgd2lkdGggKiAoayArIDMpXSA9IDE7XHJcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspIHtcclxuICAgICAgICAgICAgICAgIHFyZnJhbWVbKHkgKyB4KSArIHdpZHRoICoga10gPSAxO1xyXG4gICAgICAgICAgICAgICAgcXJmcmFtZVt5ICsgd2lkdGggKiAoayArIHggKyAxKV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoeSArIDYpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh5ICsgeCArIDEpICsgd2lkdGggKiAoayArIDYpXSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh4ID0gMTsgeCA8IDU7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgc2V0bWFzayh5ICsgeCwgayArIDEpO1xyXG4gICAgICAgICAgICAgICAgc2V0bWFzayh5ICsgMSwgayArIHggKyAxKTtcclxuICAgICAgICAgICAgICAgIHNldG1hc2soeSArIDUsIGsgKyB4KTtcclxuICAgICAgICAgICAgICAgIHNldG1hc2soeSArIHggKyAxLCBrICsgNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh4ID0gMjsgeCA8IDQ7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoeSArIHgpICsgd2lkdGggKiAoayArIDIpXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh5ICsgMikgKyB3aWR0aCAqIChrICsgeCArIDEpXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh5ICsgNCkgKyB3aWR0aCAqIChrICsgeCldID0gMTtcclxuICAgICAgICAgICAgICAgIHFyZnJhbWVbKHkgKyB4ICsgMSkgKyB3aWR0aCAqIChrICsgNCldID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyBhbGlnbm1lbnQgYmxvY2tzXHJcbiAgICAgICAgaWYgKHZlcnNpb24gPiAxKSB7XHJcbiAgICAgICAgICAgIHQgPSBhZGVsdGFbdmVyc2lvbl07XHJcbiAgICAgICAgICAgIHkgPSB3aWR0aCAtIDc7XHJcbiAgICAgICAgICAgIGZvciAoOzspIHtcclxuICAgICAgICAgICAgICAgIHggPSB3aWR0aCAtIDc7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoeCA+IHQgLSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHV0YWxpZ24oeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPCB0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB4IC09IHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA8PSB0ICsgOSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIHkgLT0gdDtcclxuICAgICAgICAgICAgICAgIHB1dGFsaWduKDYsIHkpO1xyXG4gICAgICAgICAgICAgICAgcHV0YWxpZ24oeSwgNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLy8gc2luZ2xlIGJsYWNrXHJcbiAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA4KV0gPSAxO1xyXG5cclxuICAgIC8vIHRpbWluZyBnYXAgLSBtYXNrIG9ubHlcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKSB7XHJcbiAgICAgICAgICAgIHNldG1hc2soNywgeSk7XHJcbiAgICAgICAgICAgIHNldG1hc2sod2lkdGggLSA4LCB5KTtcclxuICAgICAgICAgICAgc2V0bWFzayg3LCB5ICsgd2lkdGggLSA3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xyXG4gICAgICAgICAgICBzZXRtYXNrKHgsIDcpO1xyXG4gICAgICAgICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDcpO1xyXG4gICAgICAgICAgICBzZXRtYXNrKHgsIHdpZHRoIC0gOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vIHJlc2VydmUgbWFzay1mb3JtYXQgYXJlYVxyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCA5OyB4KyspXHJcbiAgICAgICAgICAgIHNldG1hc2soeCwgOCk7XHJcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xyXG4gICAgICAgICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDgpO1xyXG4gICAgICAgICAgICBzZXRtYXNrKDgsIHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKVxyXG4gICAgICAgICAgICBzZXRtYXNrKDgsIHkgKyB3aWR0aCAtIDcpO1xyXG5cclxuICAgIC8vIHRpbWluZyByb3cvY29sXHJcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTQ7IHgrKylcclxuICAgICAgICAgICAgaWYgKHggJiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRtYXNrKDggKyB4LCA2KTtcclxuICAgICAgICAgICAgICAgIHNldG1hc2soNiwgOCArIHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoOCArIHgpICsgd2lkdGggKiA2XSA9IDE7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWzYgKyB3aWR0aCAqICg4ICsgeCldID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vIHZlcnNpb24gYmxvY2tcclxuICAgICAgICBpZiAodmVyc2lvbiA+IDYpIHtcclxuICAgICAgICAgICAgdCA9IHZwYXRbdmVyc2lvbiAtIDddO1xyXG4gICAgICAgICAgICBrID0gMTc7XHJcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgMzsgeSsrLCBrLS0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgJiAoayA+IDExID8gdmVyc2lvbiA+PiAoayAtIDEyKSA6IHQgPj4gaykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVsoNSAtIHgpICsgd2lkdGggKiAoMiAtIHkgKyB3aWR0aCAtIDExKV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lWygyIC0geSArIHdpZHRoIC0gMTEpICsgd2lkdGggKiAoNSAtIHgpXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldG1hc2soNSAtIHgsIDIgLSB5ICsgd2lkdGggLSAxMSk7XHJcbiAgICAgICAgICAgICAgICBzZXRtYXNrKDIgLSB5ICsgd2lkdGggLSAxMSwgNSAtIHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vIHN5bmMgbWFzayBiaXRzIC0gb25seSBzZXQgYWJvdmUgZm9yIHdoaXRlIHNwYWNlcywgc28gYWRkIGluIGJsYWNrIGJpdHNcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcclxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8PSB5OyB4KyspXHJcbiAgICAgICAgICAgICAgICBpZiAocXJmcmFtZVt4ICsgd2lkdGggKiB5XSlcclxuICAgICAgICAgICAgICAgICAgICBzZXRtYXNrKHgsIHkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnQgc3RyaW5nIHRvIGJpdHN0cmVhbVxyXG4gICAgLy8gOCBiaXQgZGF0YSB0byBRUi1jb2RlZCA4IGJpdCBkYXRhIChudW1lcmljIG9yIGFscGhhbnVtLCBvciBrYW5qaSBub3Qgc3VwcG9ydGVkKVxyXG4gICAgICAgIHYgPSBzdHJpbmJ1Zi5sZW5ndGg7XHJcblxyXG4gICAgLy8gc3RyaW5nIHRvIGFycmF5XHJcbiAgICAgICAgZm9yKCBpID0gMCA7IGkgPCB2OyBpKysgKVxyXG4gICAgICAgICAgICBlY2NidWZbaV0gPSBzdHJpbmJ1Zi5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIHN0cmluYnVmID0gZWNjYnVmLnNsaWNlKDApO1xyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSBtYXggc3RyaW5nIGxlbmd0aFxyXG4gICAgICAgIHggPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyO1xyXG4gICAgICAgIGlmICh2ID49IHggLSAyKSB7XHJcbiAgICAgICAgICAgIHYgPSB4IC0gMjtcclxuICAgICAgICAgICAgaWYgKHZlcnNpb24gPiA5KVxyXG4gICAgICAgICAgICAgICAgdi0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyBzaGlmdCBhbmQgcmVwYWNrIHRvIGluc2VydCBsZW5ndGggcHJlZml4XHJcbiAgICAgICAgaSA9IHY7XHJcbiAgICAgICAgaWYgKHZlcnNpb24gPiA5KSB7XHJcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IDA7XHJcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAzXSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcclxuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAzXSB8PSAyNTUgJiAodCA8PCA0KTtcclxuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IHQgPj4gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmJ1ZlsyXSB8PSAyNTUgJiAodiA8PCA0KTtcclxuICAgICAgICAgICAgc3RyaW5idWZbMV0gPSB2ID4+IDQ7XHJcbiAgICAgICAgICAgIHN0cmluYnVmWzBdID0gMHg0MCB8ICh2ID4+IDEyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAxXSA9IDA7XHJcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcclxuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSB8PSAyNTUgJiAodCA8PCA0KTtcclxuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAxXSA9IHQgPj4gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmJ1ZlsxXSB8PSAyNTUgJiAodiA8PCA0KTtcclxuICAgICAgICAgICAgc3RyaW5idWZbMF0gPSAweDQwIHwgKHYgPj4gNCk7XHJcbiAgICAgICAgfVxyXG4gICAgLy8gZmlsbCB0byBlbmQgd2l0aCBwYWQgcGF0dGVyblxyXG4gICAgICAgIGkgPSB2ICsgMyAtICh2ZXJzaW9uIDwgMTApO1xyXG4gICAgICAgIHdoaWxlIChpIDwgeCkge1xyXG4gICAgICAgICAgICBzdHJpbmJ1ZltpKytdID0gMHhlYztcclxuICAgICAgICAgICAgLy8gYnVmZmVyIGhhcyByb29tICAgIGlmIChpID09IHgpICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHN0cmluYnVmW2krK10gPSAweDExO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgYW5kIGFwcGVuZCBFQ0NcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgZ2VuZXJhdG9yIHBvbHlub21pYWxcclxuICAgICAgICBnZW5wb2x5WzBdID0gMTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWNjYmxrd2lkOyBpKyspIHtcclxuICAgICAgICAgICAgZ2VucG9seVtpICsgMV0gPSAxO1xyXG4gICAgICAgICAgICBmb3IgKGogPSBpOyBqID4gMDsgai0tKVxyXG4gICAgICAgICAgICAgICAgZ2VucG9seVtqXSA9IGdlbnBvbHlbal1cclxuICAgICAgICAgICAgICAgID8gZ2VucG9seVtqIC0gMV0gXiBnZXhwW21vZG5uKGdsb2dbZ2VucG9seVtqXV0gKyBpKV0gOiBnZW5wb2x5W2ogLSAxXTtcclxuICAgICAgICAgICAgZ2VucG9seVswXSA9IGdleHBbbW9kbm4oZ2xvZ1tnZW5wb2x5WzBdXSArIGkpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8PSBlY2NibGt3aWQ7IGkrKylcclxuICAgICAgICAgICAgZ2VucG9seVtpXSA9IGdsb2dbZ2VucG9seVtpXV07IC8vIHVzZSBsb2dzIGZvciBnZW5wb2x5W10gdG8gc2F2ZSBjYWxjIHN0ZXBcclxuXHJcbiAgICAvLyBhcHBlbmQgZWNjIHRvIGRhdGEgYnVmZmVyXHJcbiAgICAgICAgayA9IHg7XHJcbiAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5lY2NibGsxOyBpKyspIHtcclxuICAgICAgICAgICAgYXBwZW5kcnMoeSwgZGF0YWJsa3csIGssIGVjY2Jsa3dpZCk7XHJcbiAgICAgICAgICAgIHkgKz0gZGF0YWJsa3c7XHJcbiAgICAgICAgICAgIGsgKz0gZWNjYmxrd2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmVjY2JsazI7IGkrKykge1xyXG4gICAgICAgICAgICBhcHBlbmRycyh5LCBkYXRhYmxrdyArIDEsIGssIGVjY2Jsa3dpZCk7XHJcbiAgICAgICAgICAgIHkgKz0gZGF0YWJsa3cgKyAxO1xyXG4gICAgICAgICAgICBrICs9IGVjY2Jsa3dpZDtcclxuICAgICAgICB9XHJcbiAgICAvLyBpbnRlcmxlYXZlIGJsb2Nrc1xyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhYmxrdzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuZWNjYmxrMTsgaisrKVxyXG4gICAgICAgICAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZltpICsgaiAqIGRhdGFibGt3XTtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsyOyBqKyspXHJcbiAgICAgICAgICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmWyhuZWNjYmxrMSAqIGRhdGFibGt3KSArIGkgKyAoaiAqIChkYXRhYmxrdyArIDEpKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBuZWNjYmxrMjsgaisrKVxyXG4gICAgICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmWyhuZWNjYmxrMSAqIGRhdGFibGt3KSArIGkgKyAoaiAqIChkYXRhYmxrdyArIDEpKV07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKVxyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazEgKyBuZWNjYmxrMjsgaisrKVxyXG4gICAgICAgICAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1Zlt4ICsgaSArIGogKiBlY2NibGt3aWRdO1xyXG4gICAgICAgIHN0cmluYnVmID0gZWNjYnVmO1xyXG5cclxuICAgIC8vIHBhY2sgYml0cyBpbnRvIGZyYW1lIGF2b2lkaW5nIG1hc2tlZCBhcmVhLlxyXG4gICAgICAgIHggPSB5ID0gd2lkdGggLSAxO1xyXG4gICAgICAgIGsgPSB2ID0gMTsgICAgICAgICAvLyB1cCwgbWludXNcclxuICAgICAgICAvKiBpbnRlbGVhdmVkIGRhdGEgYW5kIGVjYyBjb2RlcyAqL1xyXG4gICAgICAgIG0gPSAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xyXG4gICAgICAgICAgICB0ID0gc3RyaW5idWZbaV07XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCA4OyBqKyssIHQgPDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICgweDgwICYgdClcclxuICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB3aWR0aCAqIHldID0gMTtcclxuICAgICAgICAgICAgICAgIGRvIHsgICAgICAgIC8vIGZpbmQgbmV4dCBmaWxsIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHgtLTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5LS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4IC09IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9ICFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gOTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAhPSB3aWR0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeCAtPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSAhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSAtPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2ID0gIXY7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpc21hc2tlZCh4LCB5KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLy8gc2F2ZSBwcmUtbWFzayBjb3B5IG9mIGZyYW1lXHJcbiAgICAgICAgc3RyaW5idWYgPSBxcmZyYW1lLnNsaWNlKDApO1xyXG4gICAgICAgIHQgPSAwOyAgICAgICAgICAgLy8gYmVzdFxyXG4gICAgICAgIHkgPSAzMDAwMDsgICAgICAgICAvLyBkZW1lcml0XHJcbiAgICAvLyBmb3IgaW5zdGVhZCBvZiB3aGlsZSBzaW5jZSBpbiBvcmlnaW5hbCBhcmR1aW5vIGNvZGVcclxuICAgIC8vIGlmIGFuIGVhcmx5IG1hc2sgd2FzIFwiZ29vZCBlbm91Z2hcIiBpdCB3b3VsZG4ndCB0cnkgZm9yIGEgYmV0dGVyIG9uZVxyXG4gICAgLy8gc2luY2UgdGhleSBnZXQgbW9yZSBjb21wbGV4IGFuZCB0YWtlIGxvbmdlci5cclxuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgIGFwcGx5bWFzayhrKTsgICAgICAvLyByZXR1cm5zIGJsYWNrLXdoaXRlIGltYmFsYW5jZVxyXG4gICAgICAgICAgICB4ID0gYmFkY2hlY2soKTtcclxuICAgICAgICAgICAgaWYgKHggPCB5KSB7IC8vIGN1cnJlbnQgbWFzayBiZXR0ZXIgdGhhbiBwcmV2aW91cyBiZXN0P1xyXG4gICAgICAgICAgICAgICAgeSA9IHg7XHJcbiAgICAgICAgICAgICAgICB0ID0gaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodCA9PSA3KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgIC8vIGRvbid0IGluY3JlbWVudCBpIHRvIGEgdm9pZCByZWRvaW5nIG1hc2tcclxuICAgICAgICAgICAgcXJmcmFtZSA9IHN0cmluYnVmLnNsaWNlKDApOyAvLyByZXNldCBmb3IgbmV4dCBwYXNzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ICE9IGspICAgICAgICAgLy8gcmVkbyBiZXN0IG1hc2sgLSBub25lIGdvb2QgZW5vdWdoLCBsYXN0IHdhc24ndCB0XHJcbiAgICAgICAgICAgIGFwcGx5bWFzayh0KTtcclxuXHJcbiAgICAvLyBhZGQgaW4gZmluYWwgbWFzay9lY2NsZXZlbCBieXRlc1xyXG4gICAgICAgIHkgPSBmbXR3b3JkW3QgKyAoKGVjY2xldmVsIC0gMSkgPDwgMyldO1xyXG4gICAgICAgIC8vIGxvdyBieXRlXHJcbiAgICAgICAgZm9yIChrID0gMDsgayA8IDg7IGsrKywgeSA+Pj0gMSlcclxuICAgICAgICAgICAgaWYgKHkgJiAxKSB7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh3aWR0aCAtIDEgLSBrKSArIHdpZHRoICogOF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPCA2KVxyXG4gICAgICAgICAgICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICoga10gPSAxO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICogKGsgKyAxKV0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gaGlnaCBieXRlXHJcbiAgICAgICAgZm9yIChrID0gMDsgayA8IDc7IGsrKywgeSA+Pj0gMSlcclxuICAgICAgICAgICAgaWYgKHkgJiAxKSB7XHJcbiAgICAgICAgICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqICh3aWR0aCAtIDcgKyBrKV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGspXHJcbiAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVsoNiAtIGspICsgd2lkdGggKiA4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVs3ICsgd2lkdGggKiA4XSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gaW1hZ2VcclxuICAgICAgICByZXR1cm4gcXJmcmFtZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2NhbnZhcyA9IG51bGwsXHJcbiAgICAgICAgX3NpemUgPSBudWxsO1xyXG5cclxuICAgIHZhciBhcGkgPSB7XHJcblxyXG4gICAgICAgIGdldCBlY2NsZXZlbCAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlY2NsZXZlbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXQgZWNjbGV2ZWwgKHZhbCkge1xyXG4gICAgICAgICAgICBlY2NsZXZlbCA9IHZhbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgc2l6ZSAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXQgc2l6ZSAodmFsKSB7XHJcbiAgICAgICAgICAgIF9zaXplID0gdmFsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGNhbnZhcyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY2FudmFzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldCBjYW52YXMgKGVsKSB7XHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBlbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRGcmFtZTogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuZnJhbWUoc3RyaW5nKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkcmF3OiBmdW5jdGlvbiAoc3RyaW5nLCBjYW52YXMsIHNpemUsIGVjYykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWNjbGV2ZWwgPSBlY2MgfHwgZWNjbGV2ZWw7XHJcbiAgICAgICAgICAgIGNhbnZhcyA9IGNhbnZhcyB8fCBfY2FudmFzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjYW52YXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gY2FudmFzIHByb3ZpZGVkIHRvIGRyYXcgUVIgY29kZSBpbiEnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaXplID0gc2l6ZSB8fCBfc2l6ZSB8fCBNYXRoLm1pbihjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lID0gZ2VuZnJhbWUoc3RyaW5nKSxcclxuICAgICAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5jdHgsXHJcbiAgICAgICAgICAgICAgICBweCA9IE1hdGgucm91bmQoc2l6ZSAvICh3aWR0aCArIDgpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb3VuZGVkU2l6ZSA9IHB4ICogKHdpZHRoICsgOCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLmZsb29yKChzaXplIC0gcm91bmRlZFNpemUpIC8gMik7XHJcblxyXG4gICAgICAgICAgICBzaXplID0gcm91bmRlZFNpemU7XHJcblxyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lW2ogKiB3aWR0aCArIGldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChweCAqICg0ICsgaSkgKyBvZmZzZXQsIHB4ICogKDQgKyBqKSArIG9mZnNldCwgcHgsIHB4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgYXBpOiBhcGlcclxuICAgIH1cclxuXHJcbn0pKCkiXX0=