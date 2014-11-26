describe('Computed.isPresent', function(){
  it('tests values', function(){
    expect(Computed.isPresent()).toEqual(false);                // false
    expect(Computed.isPresent(null)).toEqual(false);            // false
    expect(Computed.isPresent(undefined)).toEqual(false);       // false
    expect(Computed.isPresent('')).toEqual(false);              // false
    expect(Computed.isPresent([])).toEqual(false);              // false
    expect(Computed.isPresent('\n\t')).toEqual(false);          // false
    expect(Computed.isPresent('  ')).toEqual(false);            // false
    expect(Computed.isPresent({})).toEqual(true);               // true
    expect(Computed.isPresent('\n\t Hello')).toEqual(true);     // true
    expect(Computed.isPresent('Hello world')).toEqual(true);    // true
    expect(Computed.isPresent([1,2,3])).toEqual(true);          // true
  });
});
