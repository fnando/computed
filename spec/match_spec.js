describe('Computed.match', function(){
  var object;

  beforeEach(function(){
    object = {
      hasValidEmail: Computed.match('email', /^.+@.+\..+$/)
    };
  });

  it('matches valid email', function(){
    object.email = 'john@example.org';
    expect(object.hasValidEmail()).toBeTruthy();
  });

  it('rejects invalid email', function(){
    object.email = '';
    expect(object.hasValidEmail()).toBeFalsy();

    object.email = 'invalid';
    expect(object.hasValidEmail()).toBeFalsy();
  });
});
