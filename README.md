 
To use this extention add the following code to be ran before anything else.
```
preGameLauncher.setConfig(
    preGameLauncher.createConfig(
        "twest stwing",
        "hewo :3",
        0, // unused for type string
        10 // this means it can only have up to 10 characters when editing it in the program config menu
    ),
    preGameLauncher.createConfig(
        "test number",
        12,
        5, // This means the value cannot go below 5 in the program config menu
        15 // This means the value cannot go below 15 in the program config menu
    ),
    preGameLauncher.createConfig(
        "test boolean",
        true,
        0, // unused for type boolean
        0 // unused for type boolean
    )
)

// Max of 16 config things. Can be increased by modifying pglCfg.ts if required.

preGameLauncher.run(gameVer, gameAuthor, bootToConfig?)
// Replace gameVer with the version of your program. e.g. "v1.0.0"
// Replace gameAuther with your username. e.g. "aokumo"

// bootToConfig is used for development perposes so I didn't have to input the button como every time I restarted the program.
// Is an optional argument, however if set to true then the program will boot straight into the config menu.
// Setting it to false is the same as not setting it to anything.
```
THIS EXTENTION COMES BUNDLES WITH arcade-mini-menu, arcade-text, Color Fading
> Open this page at [https://aokumo21.github.io/pglPxt/](https://aokumo21.github.io/pglPxt/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/aokumo21/pglPxt** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/aokumo21/pglPxt** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
