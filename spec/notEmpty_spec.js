describe('Computed.notEmpty', function(){
  var object;

  beforeEach(function(){
    object = {
      hasStuff: Computed.notEmpty('backpack')
    };
  });

  it('returns false for empty backpack', function(){
    object.backpack = [];
    expect(object.hasStuff()).toBeFalsy();
  });

  it('returns true when backpack has stuff', function(){
    object.backpack = ['Food', 'Sleeping Bag', 'Tent'];
    expect(object.hasStuff()).toBeTruthy();
  });
});
