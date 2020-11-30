const chai = require('chai'),
    expect = chai.expect;

chai.should();

const isEven = (num) => {
    return num % 2 === 0
}

describe('[SOME TESTS]', () => {

    it('Should be', () => {
        isEven(4).should.be.true
    });

    it('Should be', () => {
        expect(isEven(5)).to.be.false
    });

    beforeEach(() => {
        num = 5;
    });

    it('should return 10', () => {
        num = add(num, 5)
        num.should.equal(10)
    });

    it('should return 12', () => {
        add(num, 7).should.equal(12)
    });
});

const add = (num1, num2) => {
    return num1 + num2;
}

// mocha -w test
