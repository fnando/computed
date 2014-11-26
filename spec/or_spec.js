describe('Computed.or', function(){
  var object;

  beforeEach(function(){
    object = {
      readyForRain: Computed.or('hasJacket', 'hasUmbrella')
    };
  });

  it('returns false when not ready for rain', function(){
    expect(object.readyForRain()).toBeFalsy();
  });

  it('returns true when has jacket', function(){
    object.hasJacket = true;
    expect(object.readyForRain()).toBeTruthy();
  });

  it('returns true when has umbrella', function(){
    object.hasUmbrella = true;
    expect(object.readyForRain()).toBeTruthy();
  });
});
