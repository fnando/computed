describe('Computed.isEmpty', function(){
  it('returns true for empty string', function(){
    expect(Computed.isEmpty('')).toBeTruthy();
  });

  it('returns true for null', function(){
    expect(Computed.isEmpty(null)).toBeTruthy();
  });

  it('returns true for undefined', function(){
    expect(Computed.isEmpty(undefined)).toBeTruthy();
  });

  it('returns true for empty array', function(){
    expect(Computed.isEmpty([])).toBeTruthy();
  });

  it('returns true for object with no items', function(){
    expect(Computed.isEmpty({length: 0})).toBeTruthy();
  });

  it('returns false for array with items', function(){
    expect(Computed.isEmpty([1, 2, 3])).toBeFalsy();
  });

  it('returns false for object with items', function(){
    expect(Computed.isEmpty({length: 3})).toBeFalsy();
  });

  it('returns false for number', function(){
    expect(Computed.isEmpty(0)).toBeFalsy();
    expect(Computed.isEmpty(1)).toBeFalsy();
  });
});
