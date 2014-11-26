describe('Computed.none', function(){
  var object;

  beforeEach(function(){
    object = {
      isHungry: Computed.none('food')
    };
  });

  it('returns true for null value', function(){
    object.food = null;
    expect(object.isHungry()).toBeTruthy();
  });

  it('returns true for undefined value', function(){
    object.food = undefined;
    expect(object.isHungry()).toBeTruthy();
  });

  it('returns false for value', function(){
    object.food = 'bananas';
    expect(object.isHungry()).toBeFalsy();
  });
});
