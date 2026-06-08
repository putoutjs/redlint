test.only('esm: apply-privately-imported-file: transform: same-directory', (t) => {
    t.transformWithOptions('hello', {
        world: '',
    });
    t.end();
});