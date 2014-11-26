describe('Computed.equal', function(){
  var object;

  beforeEach(function(){
    object = {
        state: 'sleepy'
      , napTime: Computed.equal('state', 'sleepy')
    };
  });

  it('returns true when value match', function(){
    expect(object.napTime()).toBeTruthy();
  });

  it('returns false when value does not match', function(){
    object.state = 'hungry';
    expect(object.napTime()).toBeFalsy();
  });
});
