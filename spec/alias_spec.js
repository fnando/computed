describe('Computed.alias', function(){
  var object;

  beforeEach(function(){
    object = {
      slug: 'some-slug',
      id: Computed.alias('slug'),
      permalink: Computed.alias('id'),
      numbers: [3,1,2],
      sortedNumbers: Computed.sort('numbers'),
      orderedNumbers: Computed.alias('sortedNumbers')
    };
  });

  it('returns raw property', function(){
    expect(object.id()).toEqual(object.slug);
  });

  it('returns computed property', function(){
    expect(object.orderedNumbers()).toEqual([1,2,3]);
  });

  it('sets property value', function(){
    object.id('a-new-slug');
    expect(object.slug).toEqual('a-new-slug');
  });

  it('sets property for computed alias', function(){
    object.permalink('a-new-slug');

    expect(typeof object.id).toEqual('function');
    expect(object.slug).toEqual('a-new-slug');
  });
});
