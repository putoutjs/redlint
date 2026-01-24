__putout_processor_filesystem([
    "/",
    "/fixture/",
    ["/fixture/a.js", "hello"],
    ["/fixture/a-fix.js", "world"]
]);

// no fixture
__putout_processor_filesystem(["/"]);
