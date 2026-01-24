 test('putout: plugin-arguments: remove-useless: transform: unused', (t) => {
     t.transform('unused', {
         removeUnused,
     });
     t.end();
 });