describe('Computed.map', function(){
  var object;

  beforeEach(function(){
    object = {
      countries: [{id: 1, name: 'Brazil'}, {id: 2, name: 'USA'}],
      names: Computed.map('countries', function(country){
        return country.name;
      })
    };
  });

  it('returns names', function(){
    var names = object.names();

    expect(names.length).toEqual(2);
    expect(names[0]).toEqual('Brazil');
    expect(names[1]).toEqual('USA');
  });
});
