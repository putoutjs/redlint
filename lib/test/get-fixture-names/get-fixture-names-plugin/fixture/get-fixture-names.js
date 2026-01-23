test('esm: apply-privately-imported-file: transform: same-directory', (t) => {
    t.transform('same-directory');
    t.end();
});

test('esm: apply-privately-imported-file: transform', (t) => {
    t.transform('apply-privately-imported-file');
    t.end();
});
