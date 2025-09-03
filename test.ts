preGameLauncher.setConfig(
    preGameLauncher.createConfig(
        "dbgVer",
        "dev",
        0,
        10
    ),
    preGameLauncher.createConfig(
        "dbgAuthor",
        "aokumo",
        5,
        15
    ),
    preGameLauncher.createConfig(
        "pglDebug",
        false,
        0,
        0
    )
)
preGameLauncher.run(null, null, true)
console.log("[test.ts] GameVer: "+preGameLauncher.getGameVer())
console.log("[test.ts] GameAuth: "+preGameLauncher.getgameAuthor())