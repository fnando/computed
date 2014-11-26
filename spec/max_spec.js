describe('Computed.max', function(){
  var object;

  beforeEach(function(){
    object = {
        numbers: [1,2,3,4,5]
      , maxNumber: Computed.max('numbers')
    };
  });

  it('returns max number', function(){
    expect(object.maxNumber()).toEqual(5);
  });

  it('returns infinity for empty arrays', function(){
    object.numbers = [];
    expect(object.maxNumber()).toEqual(-Infinity);
  });
});
