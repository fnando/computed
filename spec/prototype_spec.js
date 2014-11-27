describe('Using Computed on prototype objects', function(){
  var user;
  var User = function() {};
  User.prototype.get = Computed.get;
  User.prototype.set = Computed.set;
  User.prototype.slug = Computed.alias('id');

  beforeEach(function(){
    user = new User();
  });

  it('sets property', function(){
    user.set('name', 'John');

    expect(user.name).toEqual('John');
    expect(user.get('name')).toEqual('John');
  });

  it('returns computed property', function(){
    user.set('id', 'some-slug');
    expect(user.get('slug')).toEqual('some-slug');
  });
});
