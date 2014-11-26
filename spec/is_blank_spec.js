describe('Computed.isBlank', function(){
  it('tests values', function(){
    expect(Computed.isBlank()).toEqual(true);                // true
    expect(Computed.isBlank(null)).toEqual(true);            // true
    expect(Computed.isBlank(undefined)).toEqual(true);       // true
    expect(Computed.isBlank('')).toEqual(true);              // true
    expect(Computed.isBlank([])).toEqual(true);              // true
    expect(Computed.isBlank('\n\t')).toEqual(true);          // true
    expect(Computed.isBlank('  ')).toEqual(true);            // true
    expect(Computed.isBlank({})).toEqual(false);             // false
    expect(Computed.isBlank('\n\t Hello')).toEqual(false);   // false
    expect(Computed.isBlank('Hello world')).toEqual(false);  // false
    expect(Computed.isBlank([1,2,3])).toEqual(false);        // false
  });
});
