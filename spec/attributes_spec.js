describe('Computed.attributes', function(){
  var object;

  beforeEach(function(){
    object = {
        name: 'John'
      , age: 42
      , salary: 1000
      , attributes: Computed.attributes('name', 'age')
    };
  });

  it('returns listed properties', function(){
    expect(object.attributes()).toEqual({name: 'John', age: 42});
  });
});
