 
To add your own settings into the config menu, use this:
```
PGL.pglProgCfg.push({
        name: "testBoolean",
        type: "boolean",
        defaultValue: true,
        limits: { min: 0, max: 0 }, // values does not matter as the boolean can only be true (1) or false (0) so these are not used
    })
PGL.pglProgCfg.push({
        name: "testNumber",
        type: "number",
        defaultValue: 5,
        limits: { min: 1, max: 10 }, // limits from 0 to 10. set max to -255 or smaller to disable
    })
PGL.pglProgCfg.push({
        name: "meow",
        type: "string",
        defaultValue: "Hewo :3 I'm a test string.",
        limits: { min: 0, max: 26 }, // max of 0 means the user will ony be able to input 1 character // max of 26 means the user can imput 26 characters // min is not used for strings 
    })
```

> Open this page at [https://aokumo21.github.io/pregameenv-arcade/](https://aokumo21.github.io/pregameenv-arcade/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/aokumo21/pregameenv-arcade** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/aokumo21/pregameenv-arcade** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
