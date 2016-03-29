describe('Computed.sortBy', function(){
  var object;

  beforeEach(function(){
    object = {
      users: [{name: 'John'}, {name: 'Bob'}, {name: 'Mary'}],
      sortedUsers: Computed.sortBy('users', 'name')
    };
  });

  it('sorts collection by property', function(){
    var sortedUsers = object.sortedUsers();

    expect(sortedUsers.length).toEqual(3);
    expect(sortedUsers[0].name).toEqual('Bob');
    expect(sortedUsers[1].name).toEqual('John');
    expect(sortedUsers[2].name).toEqual('Mary');
  });
});
