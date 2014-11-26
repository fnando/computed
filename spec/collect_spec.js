describe('Computed.collect', function(){
  var object;

  beforeEach(function(){
    object = {
        name: 'John Doe'
      , username: 'johndoe'
      , values: Computed.collect('name', 'username')
    };
  });

  it('returns all values', function(){
    expect(object.values()).toEqual(['John Doe', 'johndoe']);
  });

  it('returns undefined values', function(){
    object = {values: object.values};
    expect(object.values()).toEqual([undefined, undefined]);
  });
});
