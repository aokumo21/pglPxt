const userconfig: PGL.ConfigInterface[] = [
    {
        name: "testBoolean",
        type: "boolean",
        value: true,
    },
    {
        name: "testNumber",
        type: "number",
        value: 5,
        limits: { min: 0, max: 10 }, // limits from 0 to 10
    },
    {
        name: "testString",
        type: "string",
        value: "MISSINGNO.",
    },
];



PGL.RUN(null, null)