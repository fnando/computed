describe('Computed.not', function(){
  var object;

  beforeEach(function(){
    object = {
      isAnonymous: Computed.not('loggedIn')
    };
  });

  it('returns false when logged in', function(){
    object.loggedIn = true;
    expect(object.isAnonymous()).toBeFalsy();
  });

  it('returns true when not logged in', function(){
    object.loggedIn = false;
    expect(object.isAnonymous()).toBeTruthy();
  });
});
