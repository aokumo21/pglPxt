preGameLauncher.addConfigs([
    { name: "testNumber", type: "number", defaultValue: 3, limits: { min: 0, max: 10 } },
    { name: "testString", type: "string", defaultValue: "MISSINGNO.", limits: { min: 0, max: 10 } },
    { name: "testBoolean", type: "boolean", defaultValue: true, limits: { min: 0, max: 0 }
    }
]);

preGameLauncher.run(null, null, true)