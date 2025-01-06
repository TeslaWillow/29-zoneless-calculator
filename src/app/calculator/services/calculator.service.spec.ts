import { TestBed } from "@angular/core/testing";
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {

  let service: CalculatorService;

  beforeEach(()=>{
    TestBed.configureCompiler({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created w/ default value', () => {
      expect(service.resultText()).toBe('0');
      expect(service.subResultText()).toBe('0');
      expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResult to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText w/ number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');

    expect( service.lastOperator() ).toBe('-');
    expect( service.subResultText() ).toBe('1');
    expect( service.resultText() ).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('3');
  });

  it('should calculate result correctly for substraction', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('-1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('3');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('6');
  });

  it('should calculate result correctly for divition', () => {
    service.constructNumber('2');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect( service.resultText() ).toBe('1');
  });

  it('should handle decimal point', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect( service.resultText() ).toBe('1.5');
    service.constructNumber('.');
    expect( service.resultText() ).toBe('1.5');
  });

  it('should handle zero decimal point', () => {
    service.constructNumber('.');
    service.constructNumber('5');

    expect( service.resultText() ).toBe('0.5');
    service.constructNumber('.');
    expect( service.resultText() ).toBe('0.5');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect( service.resultText() ).toBe('-1');
    service.constructNumber('+/-');
    expect( service.resultText() ).toBe('1');
  });


  it('should handle backspace correctly', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');

    expect( service.resultText() ).toBe('12');
    service.constructNumber('Backspace');
    expect( service.resultText() ).toBe('1');
    service.constructNumber('Backspace');
    expect( service.resultText() ).toBe('0');
  });

});


