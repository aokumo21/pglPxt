/**
 * Provides block to funcitons in the preGameLauncher extention
 */
//% color=190 weight=0 icon="\uf120" block="preGameLauncher"

namespace preGameLauncher {
    export const pglDebugEnabled = (settings.readNumber("pglDebug") == 1 || false)
    export const preGameLauncherVer = "0.0.1"
    export const pglColourPalette = hex`
        000000
        ffffff
        0022c7
        002bfb
        d62816
        ff331c
        d433c7
        ff40fc
        00c525
        00f92f
        00c7c9
        00fbfe
        ccc82a
        fffc36
        cacaca
        000000`
    
    /**
     * This runs the preGameLauncher. Place this at the start of the on start block.
     * @param interval speed of scroll
    */
    //% block
    //% blockId=run_pre_game_launcher
    //% block="run|preGameLauncher| gameVersion: $gameVer|gameAuthor: $gameAuthor|bootToConfig %bootToConfig"
    //% group="Run"
    //% weight=100
    export function run(gameVer: string, gameAuthor: string, bootToConfig?: boolean) {
        gameVer = settings.readString("dbgVer") || gameVer
        gameAuthor = settings.readString("dbgAuthor") || gameAuthor
        // 0 Transparent
        // 1 White
        // 2 DarkBlue
        // 3 Blue
        // 4 DarkRed
        // 5 Red
        // 6 DarkPink
        // 7 Pink
        // 8 DarkGreen
        // 9 Green
        // 10 DarkCyan
        // 11 Cyan
        // 12 DarkYellow
        // 13 Yellow
        // 14 Gray
        // 15 Black
        //https://lospec.com/palette-list/zx-spectrum-adjusted
        color.setPalette(color.bufferToPalette(pglColourPalette))
        controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
        })
        console.log("=========================")
        console.log("Check out the github repo! https://github.com/aokumo21/pglPxt/")
        console.log("=========================")
        console.log("====CONSOLE=LOG=START====")
        console.log("=========================")
        scene.setBackgroundColor(15)
        game.consoleOverlay.setVisible(true)
        
        settings.writeString("gameVer", gameVer || "msgnotfound")
        settings.writeString("gameAuthor", gameAuthor || "msgnotfound")
        console.log("PreGameLauncher: " + preGameLauncherVer)
        // Print device info
        pause(100)
        console.log("=========================") 
        console.log("DAL-Ver: " + control.deviceDalVersion())
        console.log("RAM-Size (KB): " + control.ramSize() / 1024)
        console.log("=========================")
        pause(200)

        if (settings.readNumber("DoneInitialSetup") != 1) {
            pglInitialSetup()
        }
        screen.setBrightness(settings.readNumber("screenBrightness"))
        music.setVolume(settings.readNumber("speekerVolume"))

        console.log("Program:\n" + control.programName()) //Print programName

        if (pglDebugEnabled == true) {
            settings.writeString("gameVer", settings.readString("gameVer") + "-DBG")
        }
        console.log("Version: " + settings.readString("gameVer")) //Print programVersion
        console.log("Author: " + settings.readString("gameAuthor")) //Print programVersion
        console.log("=========================")
        pause(1000)
        if (controller.A.isPressed() && controller.B.isPressed() && controller.down.isPressed() || (bootToConfig==true)){
            CFG_SCRN()
        }
        screen.setBrightness(settings.readNumber("screenBrightness"))
        music.setVolume((settings.readNumber("speekerVolume")))

        if (settings.readNumber("DBG_DELAYED_STARTUP") == 1) {
            console.log(" \nDELAYED STARTUP ENABLED")
            pause(5000)
        }
    }
    function CFG_SCRN() {
        pglProgCfg.push({
            name: "screenBrightness",
            cfgtype: "number",
            defaultValue: 50,
            limits: { min: 0, max: 100 },
        })
        pglProgCfg.push({
            name: "speekerVolume",
            cfgtype: "number",
            defaultValue: 50,
            limits: { min: 0, max: 255 },
        })
        console.log("CFG_SCRN")
        game.consoleOverlay.setVisible(false)
        scene.setBackgroundColor(14)
        //TopBarBackgroundImage
        const pglTbbi = image.create(screen.width, 12)
        pglTbbi.fill(2)

        //TopBarBackgroundSprite
        const pglTbbs = sprites.create(pglTbbi, SpriteKind.Player)
        pglTbbs.setPosition(pglTbbs.width / 2, pglTbbs.height / 2)

        function createTextSprite(text: string, x: number, y: number){
            const pglTextSprite = textsprite.create(text, 0, 2)
            pglTextSprite.setPosition(pglTextSprite.width / 2 + x, y)
            pglTextSprite.setFlag(SpriteFlag.Invisible, true)
                if (text== "uptime"){
                    game.onUpdateInterval(1000, function () {
                        pglTextSprite.setText("Uptime: " + Math.trunc(control.millis() / 1000) + "s")
                    })
                }
            return pglTextSprite
        }

        const pglCfgMainMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("Software"),
            miniMenu.createMenuItem("System"),
            miniMenu.createMenuItem("Config"),
        )
        if (pglDebugEnabled == true) {
            pglCfgMainMenu.items.push(miniMenu.createMenuItem("Dbg"))
        }
        pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
        pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 1)
        pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 1)

        pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 14)
        pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)

        pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 2)
        pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 14)

        pglCfgMainMenu.setPosition((screen.width/2), 10)

        const pglSoftwareInfo = [
            createTextSprite("-=Launcher===--------------", 0, 18),
            createTextSprite("PreGameLauncher: " + preGameLauncherVer, 0, 26),
            createTextSprite("DAL-VER: " + control.deviceDalVersion(), 0, 34),
            createTextSprite("-=Program===---------------", 0, 42,),
            createTextSprite(control.programName(), 0, 50),
            createTextSprite("ProgHash: "+ control.programHash(), 0, 58),
            createTextSprite("Version: " + settings.readString("gameVer"), 0, 66),
            createTextSprite("Author: " + settings.readString("gameAuthor"), 1, 74),
            createTextSprite("Press menu to reboot", 20, 102),
            createTextSprite("---------------------------", 0, 109),
            createTextSprite(`github.com/aokumo21/pglPxt`, 2, 116)
        ]

        const pglDeviceInfo = [
            createTextSprite("-=Hardware===--------------", 0, 18),
            createTextSprite("RAM: " + control.ramSize() / 1024 + "KB", 0, 26),
            createTextSprite("Resolution: " + screen.width + "x" + screen.height, 0, 34),
            createTextSprite("SerialNo: " + control.deviceSerialNumber(), 0, 42),
            createTextSprite("-=Status===----------------", 0, 50),
            createTextSprite("Usb-Initialised: " + control.isUSBInitialized(), 0, 58),
            createTextSprite("Profiling-Enabled: " + control.profilingEnabled(), 0, 66),
            createTextSprite("DisplayBrightness: " + screen.brightness(), 0, 74),
            createTextSprite("Volume: " + music.volume(), 0, 82),
            createTextSprite("uptime", 0, 90),
            createTextSprite("---------------------------", 0, 109),
            createTextSprite(`github.com/aokumo21/pglPxt`, 2, 116)
        ]
        //////////////
        //Config tab//
        //////////////
        let pglGUI_ConfigTab: miniMenu.MenuSprite = null
        pglGUI_ConfigTab = miniMenu.createMenuFromArray(create_pglMENUITM())
        setupMiniMenu(pglGUI_ConfigTab)

        let pglConfigModifed = false
        pglGUI_ConfigTab.onButtonPressed(controller.A, function (selection, selectedIndex) {
            const pglOptionMin = pglProgCfg.get(selectedIndex).limits.min
            const pglOptionMax = pglProgCfg.get(selectedIndex).limits.max
            const pglPromptName = pglProgCfg.get(selectedIndex).name
            const pglOptionType = pglProgCfg.get(selectedIndex).cfgtype
            color.setColor(7, 0x0022c7)
            color.setColor(6, 0xffffff)
            if (pglOptionType == "string") {
                settings.writeString(pglPromptName, game.askForString(pglPromptName, pglOptionMax > 0 ? pglOptionMax : 1))
                console.log(pglPromptName + ": " + settings.readString(pglPromptName))
            } else if (pglOptionType == "number") {
                let pgloor = "Range: (" + pglOptionMin + " - " + pglOptionMax+") \n"
                    while (true) {
                    let value = game.askForNumber(pgloor + pglPromptName, 10)
                    if (value >= pglOptionMin && value <= pglOptionMax) {
                        console.log("Value in range")
                        settings.writeNumber(pglPromptName, value)
                        break
                    } else {
                        pgloor = " Input of Range (" + pglOptionMin + "-" + pglOptionMax+")\n"
                        console.log("Value out of range")
                    }
                }
                console.log(pglPromptName + ": " + settings.readNumber(pglPromptName))
            } else if (pglOptionType == "boolean") {
                settings.writeNumber(pglPromptName, +pglAsk(pglPromptName))
                console.log(pglPromptName + ": " + settings.readNumber(pglPromptName))
            }
            color.setPalette(color.bufferToPalette(pglColourPalette))
            pglGUI_ConfigTab.setMenuItems(create_pglMENUITM()) // It took way too long for me to figure out how to make the menu update :sob:
            pglConfigModifed = true
        })
        pglGUI_ConfigTab.onButtonPressed(controller.B, function (selection, selectedIndex) {
            pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)
            pglGUI_ConfigTab.setButtonEventsEnabled(false)
            pglCfgMainMenu.setButtonEventsEnabled(true)
            if (pglConfigModifed == true && pglAsk("Restart required.", "Press A to reboot now.")) {
                 control.reset()
            }
            pglConfigModifed = false
        })

        //////////////////
        //Debug menu tab//
        //////////////////
        const pglGUI_DebugTab = miniMenu.createMenu(
            miniMenu.createMenuItem("Disable debug mode"),
            miniMenu.createMenuItem("???"),
            miniMenu.createMenuItem("Clear Data"),
        )

        setupMiniMenu(pglGUI_DebugTab)
        pglGUI_DebugTab.onButtonPressed(controller.B, function (selection, selectedIndex) {
            pglGUI_DebugTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)
            pglGUI_DebugTab.setButtonEventsEnabled(false)
            pglCfgMainMenu.setButtonEventsEnabled(true)
        })

        //////////////////////
        //Menu input handler//
        //////////////////////
        pglCfgMainMenu.onSelectionChanged(function (selection: string, selectedIndex: number) {
            console.log(selection)

            for (let s of pglSoftwareInfo) s.setFlag(SpriteFlag.Invisible, true)
            for (let s of pglDeviceInfo) s.setFlag(SpriteFlag.Invisible, true)
            pglGUI_ConfigTab.setFlag(SpriteFlag.Invisible, true)
            pglGUI_DebugTab.setFlag(SpriteFlag.Invisible, true)

            if (selectedIndex == 0) {  
                for (let s of pglSoftwareInfo) s.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 1) {
                for (let s of pglDeviceInfo) s.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 2) {
                pglGUI_ConfigTab.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 3) {
                pglGUI_DebugTab.setFlag(SpriteFlag.Invisible, false)
            }
        })

        pglCfgMainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 2) {
                pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
                pglCfgMainMenu.setButtonEventsEnabled(false)
                pglGUI_ConfigTab.setButtonEventsEnabled(true)
                pglConfigModifed = false

            } else if (selectedIndex == 3) {
                pglGUI_DebugTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
                pglCfgMainMenu.setButtonEventsEnabled(false)
                pglGUI_DebugTab.setButtonEventsEnabled(true)

            }
        })

        pglCfgMainMenu.onButtonPressed(controller.menu, function (selection, selectedIndex) {
            if (controller.A.isPressed() && (controller.B.isPressed() && controller.up.isPressed())) {
                if (pglAsk("ENABLE DEBUG?", "THE DEVICE WILL RESTART.")) {
                    settings.writeNumber("pglDebug", 1)
                    control.reset()
                }
            } else if (selectedIndex == 0 && pglAsk("NOTICE", "Press A to reboot.")) {
                control.reset()
            }
        })
        pglGUI_DebugTab.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {  
                if (pglAsk("DISABLE DEBUG?", "THE DEVICE WILL RESTART.")) { settings.clear(); game.reset() }
            } else if (selectedIndex == 1) {

            } else if (selectedIndex == 2) {
                if (pglAsk("CLEAR DATA?", "THIS CANNOT BE REVERTED.", 5)) { settings.clear(); game.reset() }
            }
        })
    }

    function pglInitialSetup() {
        console.log("InitialSetup")
        settings.writeNumber("screenBrightness", screen.brightness())
        settings.writeNumber("speekerVolume", music.volume())
        for (let i = 0; i < pglProgCfg.length; i++) {
            if (pglProgCfg.get(i).cfgtype == "string") {
                settings.writeString(pglProgCfg.get(i).name, ""+pglProgCfg.get(i).defaultValue)
                console.log(settings.readString(pglProgCfg.get(i).name))

            } else if (pglProgCfg.get(i).cfgtype == "boolean") {
                if (pglProgCfg.get(i).defaultValue == true) {
                    settings.writeNumber(pglProgCfg.get(i).name, 1)
                } else {
                    settings.writeNumber(pglProgCfg.get(i).name, 0)
                }
                console.log(settings.readNumber(pglProgCfg.get(i).name))
            } else if (pglProgCfg.get(i).cfgtype == "number") {
                settings.writeNumber(pglProgCfg.get(i).name, +pglProgCfg.get(i).defaultValue)
                console.log(settings.readNumber(pglProgCfg.get(i).name))
            }
        }
        settings.writeNumber("DoneInitialSetup", 1)
    }

    function create_pglMENUITM() {
        let pglMENUITM_ConfigList: miniMenu.MenuItem[] = []
        console.log("create_pglMENUITM")
        for (let i = 0; i < pglProgCfg.length; i++) {
            if (pglProgCfg.get(i).cfgtype == "string") {
                pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": " + settings.readString(pglProgCfg.get(i).name)))
            } else if (pglProgCfg.get(i).cfgtype == "number") {
                pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": " + settings.readNumber(pglProgCfg.get(i).name)))
            } else if (pglProgCfg.get(i).cfgtype == "boolean") {
                switch (settings.readNumber(pglProgCfg.get(i).name)) {
                    case 0:
                        pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": false"))
                        break
                    case 1:
                        pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": true"))
                        break
                }
            }
        }
        return (pglMENUITM_ConfigList)
    }  
    const pglProgCfg: ConfigInterface[] = []

    export interface ConfigInterface {
        name: string
        cfgtype: ConfigType
        defaultValue: boolean | number | string
        limits: {
            min: number
            max: number
        }
    }

    type ConfigType = "boolean" | "number" | "string"

    //% blockId=create_configeration
    //% block="Configuration|cfgName %name|defaultValue %defaultValue|minValue %min|maxValue %max"
    //% group="Config"
    //% weight=90
    //% name.defl="name"
    //% min.defl="0"
    //% max.defl="1"
    export function createConfig(
        name: string,
        defaultValue: boolean | number | string,
        min: number,
        max: number
    ): ConfigInterface {
        let cfgtype: ConfigType
        console.log(name)
        console.log(defaultValue)
        console.log(min)
        console.log(max)
        if (defaultValue === undefined || defaultValue === ""){
            defaultValue = "MISSINGNO."
            cfgtype = "string"
        } else if (typeof defaultValue === "number") {
            cfgtype = "number"
        } else if (typeof defaultValue === "boolean") {
            cfgtype = "boolean"
        } else {
            cfgtype = "string"
        }
        return {
            name,
            cfgtype,
            defaultValue,
            limits: { min, max }
        }
    }
    // "Borrowed" most of this code from the mini menu extention. So credits to riknoll.
    // https://github.com/riknoll/arcade-mini-menu

    /**
     * Sets the config used in the config tab in the pgl menu.
     */
    //% blockId=set_configeration
    //% block="create menu sprite|$cfgitem1||$cfgitem2 $cfgitem3 $cfgitem4 $cfgitem5 $cfgitem6 $cfgitem7 $cfgitem8 $cfgitem9 $cfgitem10 $cfgitem11 $cfgitem12 $cfgitem13 $cfgitem14 $cfgitem15 $cfgitem16"
    //% blockSetVariable=setConfig
    //% cfgitem1.shadow=create_configeration
    //% cfgitem2.shadow=create_configeration
    //% cfgitem3.shadow=create_configeration
    //% cfgitem4.shadow=create_configeration
    //% cfgitem5.shadow=create_configeration
    //% cfgitem6.shadow=create_configeration
    //% cfgitem7.shadow=create_configeration
    //% cfgitem8.shadow=create_configeration
    //% cfgitem9.shadow=create_configeration
    //% cfgitem10.shadow=create_configeration
    //% cfgitem11.shadow=create_configeration
    //% cfgitem12.shadow=create_configeration
    //% cfgitem13.shadow=create_configeration
    //% cfgitem14.shadow=create_configeration
    //% cfgitem15.shadow=create_configeration
    //% cfgitem16.shadow=create_configeration
    //% group="Config"
    //% weight=100
    export function setConfig(
        cfgitem1: ConfigInterface,
        cfgitem2?: ConfigInterface,
        cfgitem3?: ConfigInterface,
        cfgitem4?: ConfigInterface,
        cfgitem5?: ConfigInterface,
        cfgitem6?: ConfigInterface,
        cfgitem7?: ConfigInterface,
        cfgitem8?: ConfigInterface,
        cfgitem9?: ConfigInterface,
        cfgitem10?: ConfigInterface,
        cfgitem11?: ConfigInterface,
        cfgitem12?: ConfigInterface,
        cfgitem13?: ConfigInterface,
        cfgitem14?: ConfigInterface,
        cfgitem15?: ConfigInterface,
        cfgitem16?: ConfigInterface,
    ) {
        const a = [
            cfgitem1,
            cfgitem2,
            cfgitem3,
            cfgitem4,
            cfgitem5,
            cfgitem6,
            cfgitem7,
            cfgitem8,
            cfgitem9,
            cfgitem10,
            cfgitem11,
            cfgitem12,
            cfgitem13,
            cfgitem14,
            cfgitem15,
            cfgitem16,
        ]
        for (let i = 0; Infinity; i++) {
            if (a[i] === undefined) {
                break
            }
            pglProgCfg.push(a[i])
        }
    }
    
        function setupMiniMenu(menu: miniMenu.MenuSprite) {
        menu.setButtonEventsEnabled(false)
        menu.setFlag(SpriteFlag.RelativeToCamera, true)
        menu.setDimensions(160, 96)
        menu.setPosition(screen.width - menu.width / 2 + 0, 60)
        menu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 14)
        menu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, 2)
    }
    
    function pglAsk(title: string, subtitle?: string, backgroundColour?: number) {
        game.pushScene()
        color.setColor(7, 0xffffff)
        color.setColor(6, 0xffffff)
        scene.setBackgroundColor(backgroundColour || 2)
        pause(1)
        if (game.ask(title, subtitle)) {
            color.setPalette(color.bufferToPalette(pglColourPalette))
            game.popScene()
            return true
        } 
        color.setPalette(color.bufferToPalette(pglColourPalette))
        game.popScene()
        return false
    }
}