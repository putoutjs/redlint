test('esm: apply-privately-imported-file: transform: same-directory', (t) => {
    t.transform('same-directory');
    t.end();
});

test.only('esm: apply-privately-imported-file: transform', (t) => {
    t.transform('only');
    t.end();
});
