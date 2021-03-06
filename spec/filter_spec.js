describe('Computed.filter', function(){
  var object;

  beforeEach(function(){
    object = {
      tasks: [{id: 1, state: 'done'}, {id: 2, state: 'pending'}],
      pendingTasks: Computed.filter('tasks', function(task){
        return task.state === 'pending';
      })
    };
  });

  it('returns pending tasks', function(){
    var pendingTasks = object.pendingTasks();

    expect(pendingTasks.length).toEqual(1);
    expect(pendingTasks[0].id).toEqual(2);
  });
});
