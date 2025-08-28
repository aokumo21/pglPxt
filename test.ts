PGL.pglProgCfg.push({
        name: "testBoolean",
        type: "boolean",
        defaultValue: true,
        limits: { min: 0, max: 0 }, // value does not matter as the boolean can only be true (1) or false (0)
    })
PGL.pglProgCfg.push({
        name: "testNumber",
        type: "number",
        defaultValue: 5,
        limits: { min: 1, max: 10 }, // limits from 0 to 10. set max to -255 or smaller to disable
    })
PGL.pglProgCfg.push({
        name: "testString",
        type: "string",
        defaultValue: "MISSINGNO.",
        limits: { min: 0, max: 0 }, // 0 means the user will ony be able to input 1 character
    })


PGL.RUN(null, null)