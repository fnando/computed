describe('Computed.lte', function(){
  beforeEach(function(){
    object = {
      needsMoreBananas: Computed.lte('numBananas', 10)
    };
  });

  it('returns false when property is greater than value', function(){
    object.numBananas = 11;
    expect(object.needsMoreBananas()).toBeFalsy();
  });

  it('returns true when property is equal to value', function(){
    object.numBananas = 10;
    expect(object.needsMoreBananas()).toBeTruthy();
  });

  it('returns true when property is less than value', function(){
    object.numBananas = 9;
    expect(object.needsMoreBananas()).toBeTruthy();
  });
});
