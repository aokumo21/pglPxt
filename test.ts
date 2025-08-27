const pglProgCfg: PGL.ConfigInterface[] = [
    {
        name: "testBoolean",
        type: "boolean",
        defaultValue: true,
    },
    {
        name: "testNumber",
        type: "number",
        defaultValue: 5,
        limits: { min: 0, max: 10 }, // limits from 0 to 10
    },
    {
        name: "testString",
        type: "string",
        defaultValue: "MISSINGNO.",
    },
];

PGL.RUN(null, null)