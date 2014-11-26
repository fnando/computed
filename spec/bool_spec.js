describe('Computed.bool', function(){
  var object;

  beforeEach(function(){
    object = {
      hasBananas: Computed.bool('numBananas')
    };
  });

  it('returns true when has bananas', function(){
    object.numBananas = 1;
    expect(object.hasBananas()).toBeTruthy();
  });

  it('returns false when has no bananas', function(){
    object.numBananas = 0;
    expect(object.hasBananas()).toBeFalsy();
  });
});
