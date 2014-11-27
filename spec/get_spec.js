describe('Computed.get', function(){
  it('returns raw property', function(){
    var object = {name: 'John'};
    expect(Computed.get(object, 'name')).toEqual('John');
  });

  it('returns computed property', function(){
    var object = {name: 'John', firstName: Computed.alias('name')};
    expect(Computed.get(object, 'firstName')).toEqual('John');
  });

  it('returns chained property', function(){
    var object = {a: {b: 1}};
    expect(Computed.get(object, 'a.b')).toEqual(1);
  });

  it('returns undefined for broken chain', function(){
    var object = {};
    expect(Computed.get(object, 'a.b.c')).not.toBeDefined();
  });
});
