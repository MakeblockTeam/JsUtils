import { expect } from "chai";
import { rj25 } from '../dist/mscratch-utils';

const formatFaceData = rj25.formatFaceData;
const formatColorData = rj25.formatColorData;
const formatPowerData = rj25.formatPowerData;

describe('rj25', function () {
    describe('#formatFaceData = (code) => ', function () {
        it('should return code when the code is no string', function () {
            expect(formatFaceData(undefined)).to.be.equal(undefined);
            const code = [1, 2, 3]
            expect(formatFaceData(code)).to.be.equal(code);
        })
    })

    describe('#formatFaceData = (code) => ', function () {
        it('single line -- should return code when the code does not contain new unsigned char[16]', function () {
            expect(formatFaceData('123')).to.be.equal('123');
        })
    })

    describe('#formatFaceData = (code) => ', function () {
        const code = `
        #include <Arduino.h>;
        void _delay(float seconds){
            long endTime = millis() + seconds * 1000;
            while(millis() < endTime)_loop();
        }`

        it('muti line -- should return code when the code does not contain new unsigned char[16]', function () {
            expect(formatFaceData(code)).to.be.equal(code);
        })
    })

    describe('#formatFaceData = (code) => ', function () {
        const code = 'new unsigned char[16]{00011000001111000011111000011110001111100011110000011000000000000000000000011000001111000011111000011110001111100011110000011000}'
        const result = 'new unsigned char[16]{24,60,62,30,62,60,24,0,0,24,60,62,30,62,60,24}'

        it('should return formatFaceData when the code contain new unsigned char[16]', function () {
            expect(formatFaceData(code)).to.be.equal(result);
        })
    })


    //formatColorData
    describe('#formatColorData = (code) => ', function () {
        it('should return code when the code is no string', function () {
            expect(formatColorData(undefined)).to.be.equal(undefined);
            const code = [1, 2, 3]
            expect(formatColorData(code)).to.be.equal(code);
        })
    })

    describe('#formatColorData = (code) => ', function () {
        it('single line -- should return code when the code does not contain /#[0-9A-f]+/g', function () {
            expect(formatColorData('123')).to.be.equal('123');
        })
    })

    describe('#formatColorData = (code) => ', function () {
        const code = `
        #include <Arduino.h>;
        void _delay(float seconds){
            long endTime = millis() + seconds * 1000;
            while(millis() < endTime)_loop();
        }`

        it('muti line -- should return code when the code does not contain /#[0-9A-f]+/g', function () {
            expect(formatColorData(code)).to.be.equal(code);
        })
    })

    describe('#formatColorData = (code) => ', function () {
        const code = 'rgbled_7.setColor(0,#ff0000)'
        const result = 'rgbled_7.setColor(0,255,0,0)'

        it('should return result when the code contain /#[0-9A-f]+/g', function () {
            expect(formatColorData(code)).to.be.equal(result);
        })
    })

    //formatPowerData
    describe('#formatPowerData = (code) => ', function () {
        it('should return code when the code is no string', function () {
            expect(formatPowerData(undefined)).to.be.equal(undefined);
            const code = [1, 2, 3]
            expect(formatPowerData(code)).to.be.equal(code);
        })
    })

    describe('#formatPowerData = (code) => ', function () {
        it('single line -- should return code when the code does not contain /[0-9]+%/', function () {
            expect(formatPowerData('123')).to.be.equal('123');
        })
    })

    describe('#formatPowerData = (code) => ', function () {
        const code = `
        #include <Arduino.h>;
        void _delay(float seconds){
            long endTime = millis() + seconds * 1000;
            while(millis() < endTime)_loop();
        }`

        it('muti line -- should return code when the code does not contain /[0-9]+%/', function () {
            expect(formatPowerData(code)).to.be.equal(code);
        })
    })

    describe('#formatPowerData = (code) => ', function () {
        const code = 'motor.setPower(50%)'
        const result = 'motor.setPower(127.5)'

        it('should return result when the code contain /[0-9]+%/', function () {
            expect(formatPowerData(code)).to.be.equal(result);
        })
    })
})