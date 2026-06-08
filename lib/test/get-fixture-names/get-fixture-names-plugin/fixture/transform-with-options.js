 test('putout: plugin-arguments: remove-useless: transform: unused', (t) => {
     t.transformWithOptions('hello', {
         name: 'abc',
     });
     t.end();
 });