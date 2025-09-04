pgl.setConfig(
    pgl.createConfig(
        "dbgVer",
        "dev",
        0,
        10
    ),
    pgl.createConfig(
        "dbgAuthor",
        "aokumo",
        5,
        15
    ),
    pgl.createConfig(
        "pglDebug",
        false,
        0,
        0
    )
)
pgl.run(null, null, true)
console.log("[test.ts] GameVer: "+pgl.getGameVer())
console.log("[test.ts] GameAuth: "+pgl.getgameAuthor())