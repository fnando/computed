describe('Computed.and', function(){
  var object;

  beforeEach(function(){
    object = {
      hasTent: true,
      hasBackpack: true,
      readyForCamp: Computed.and('hasTent', 'hasBackpack')
    };
  });

  it('passes when all values are truthy', function(){
    expect(object.readyForCamp()).toBeTruthy();
  });

  it('fails when property has zero as value', function(){
    object.hasTent = 0;
    expect(object.readyForCamp()).toBeFalsy();
  });

  it('fails when property has null value', function(){
    object.hasTent = null;
    expect(object.readyForCamp()).toBeFalsy();
  });

  it('fails when property has undefined value', function(){
    object.hasTent = undefined;
    expect(object.readyForCamp()).toBeFalsy();
  });

  it('fails when property has empty string value', function(){
    object.hasTent = '';
    expect(object.readyForCamp()).toBeFalsy();
  });
});
