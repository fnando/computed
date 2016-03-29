describe('Computed.min', function(){
  var object;

  beforeEach(function(){
    object = {
      numbers: [1,2,3,4,5],
      minNumber: Computed.min('numbers')
    };
  });

  it('returns min number', function(){
    expect(object.minNumber()).toEqual(1);
  });

  it('returns infinity for empty arrays', function(){
    object.numbers = [];
    expect(object.minNumber()).toEqual(Infinity);
  });
});
