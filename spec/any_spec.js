describe('Computed.any', function(){
  var object;

  beforeEach(function(){
    object = {
      hasClothes: Computed.any('hat', 'shirt')
    };
  });

  it('returns hat value', function(){
    object.hat = 'Coco Hat';
    expect(object.hasClothes()).toEqual('Coco Hat');
  });

  it('returns shirt value', function(){
    object.shirt = 'Hawaiian Shirt';
    expect(object.hasClothes()).toEqual('Hawaiian Shirt');
  });

  it('has precedence from left to right', function(){
    object.shirt = 'Hawaiian Shirt';
    object.hat = 'Coco Hat';

    expect(object.hasClothes()).toEqual('Coco Hat');
  });
});
