describe('Computed.sort', function(){
  var object;

  beforeEach(function(){
    object = {
      names: ['John', 'Bob', 'Mary'],
      sortedNames: Computed.sort('names', function(a, b){
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }

        return 1;
      })
    };
  });

  it('sorts names', function(){
    expect(object.sortedNames()).toEqual(['Bob', 'John', 'Mary']);
  });
});
