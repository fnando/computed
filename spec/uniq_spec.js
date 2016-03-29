describe('Computed.uniq', function(){
  var object;

  beforeEach(function(){
    object = {
      even: [0, 0, 2, 2],
      odd: [1, 1, 3, 3],
      uniqueNumbers: Computed.uniq('even', 'odd'),
      numbers: Computed.sort('uniqueNumbers')
    };
  });

  it('returns numbers', function(){
    expect(object.uniqueNumbers()).toEqual([0, 2, 1, 3]);
    expect(object.numbers()).toEqual([0, 1, 2, 3]);
  });
});
