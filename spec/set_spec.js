describe('Computed.set', function(){
  it('sets property', function(){
    var object = {};
    Computed.set(object, 'a', 1);

    expect(Computed.get(object, 'a')).toEqual(1);
  });

  it('sets chained property', function(){
    var user = {profile: {}};
    Computed.set(user, 'profile.username', 'john');

    expect(Computed.get(user, 'profile.username')).toEqual('john');
  });

  it('does not fail with broken chain', function(){
    var object = {};

    expect(function(){
      Computed.set(object, 'a.b.c.d.e', 1);
    }).not.toThrow();

    expect(Computed.get(object, 'a.b.c.d.e')).not.toBeDefined();
  });
});
