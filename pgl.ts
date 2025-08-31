namespace PGL {
    export const PGL_ver = "0.0.1"

    export function RUN(GAME_ver: string, GAME_Author: string, BootToConfig?: boolean) {
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
        color.setPalette(color.bufferToPalette(hex`
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
        000000`))
        controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
        })
        console.log("=========================")
        console.log("Check out the github repo! https://github.com/aokumo21/PGLpxt/")
        console.log("=========================")
        console.log("====CONSOLE=LOG=START====")
        console.log("=========================")
        scene.setBackgroundColor(15)
        game.consoleOverlay.setVisible(true)
        settings.writeString("GAME_ver", GAME_ver)
        settings.writeString("GAME_Author", GAME_Author)
        if (settings.readNumber("DoneInitialSetup") != 1) {
            FIRST_STARTUP()
        }
        screen.setBrightness(settings.readNumber("screenBrightness"))
        music.setVolume(settings.readNumber("speekerVolume"))
        console.log("PreGameLauncher: " + PGL_ver)
        // Print device info
        pause(100)
        console.log("=========================") 
        console.log("DAL-Ver: " + control.deviceDalVersion())
        console.log("RAM-Size (KB): " + control.ramSize() / 1024)
        console.log("=========================")
        pause(200)
        
        //Will be removed later and replaced with the cfg_screen
        if (controller.A.isPressed() && (controller.B.isPressed() && controller.up.isPressed())) {
            INIT_RESET_CFG()
        }
        console.log("Program:\n" + control.programName()) //Print programName

        if (settings.readNumber("DEBUG") == 1) {
            settings.writeString("GAME_ver", settings.readString("GAME_ver") + "-DEBUG")
        }
        console.log("Version: " + settings.readString("GAME_ver")) //Print programVersion
        console.log("=========================")
        pause(1000)
        if (controller.A.isPressed() && controller.B.isPressed()){
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
            type: "number",
            defaultValue: 50,
            limits: { min: 0, max: 100 },
        })
        pglProgCfg.push({
            name: "speekerVolume",
            type: "number",
            defaultValue: 50,
            limits: { min: 0, max: 255 },
        })
        console.log("CFG_SCRN")
        game.consoleOverlay.setVisible(false)
        scene.setBackgroundColor(14)
        //TopBarBackgroundImage
        const _pglTbbi = image.create(screen.width, 12)
        _pglTbbi.fill(2)

        //TopBarBackgroundSprite
        const _pglTbbs = sprites.create(_pglTbbi, SpriteKind.Player)
        _pglTbbs.setPosition(_pglTbbs.width / 2, _pglTbbs.height / 2)

        function createTextSprite(text: string, x: number, y: number){
            const _pglTextSprite = textsprite.create(text, 0, 2)
            _pglTextSprite.setPosition(_pglTextSprite.width / 2 + x, y)
            _pglTextSprite.setFlag(SpriteFlag.Invisible, true)
                if (text== "uptime"){
                    game.onUpdateInterval(1000, function () {
                        _pglTextSprite.setText("Uptime: " + Math.trunc(control.millis() / 1000) + "s")
                    })
                }
            return _pglTextSprite
        }

        const _pglCfgMainMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("Software"),
            miniMenu.createMenuItem("System"),
            miniMenu.createMenuItem("Config"),
            miniMenu.createMenuItem("Dbg"),
        )

        _pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
        _pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 1)
        _pglCfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 1)

        _pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 14)
        _pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)

        _pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 2)
        _pglCfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 14)

        _pglCfgMainMenu.setPosition(_pglCfgMainMenu.width / 2 + 2, _pglCfgMainMenu.height / 2 - 1)

        const _pglSoftwareInfo = [
            createTextSprite("-=Launcher===--------------", 0, 18),
            createTextSprite("PreGameLauncher: " + PGL_ver, 0, 26),
            createTextSprite("DAL-VER: " + control.deviceDalVersion(), 0, 34),
            createTextSprite("-=Program===---------------", 0, 42,),
            createTextSprite(control.programName(), 0, 50),
            createTextSprite("ProgHash: "+ control.programHash(), 0, 58),
            createTextSprite("Ver: " + settings.readString("GAME_ver"), 0, 66),
            createTextSprite("Author: " + settings.readString("GAME_Author"), 1, 74),
            createTextSprite("Press menu to reboot", 20, 102),
            createTextSprite("---------------------------", 0, 109),
            createTextSprite(`github.com/aokumo21/PGLpxt`, 2, 116)
        ]

        const _pglDeviceInfo = [
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
            createTextSprite(`github.com/aokumo21/PGLpxt`, 2, 116)
        ]
        //////////////
        //CONFIG TAB//
        //////////////
        let _pglGUI_ConfigTab: miniMenu.MenuSprite = null
        _pglGUI_ConfigTab = miniMenu.createMenuFromArray(create_pglMENUITM())
        _pglGUI_ConfigTab.setButtonEventsEnabled(false)
        _pglGUI_ConfigTab.setFlag(SpriteFlag.RelativeToCamera, true)
        _pglGUI_ConfigTab.setDimensions(160, 96)
        _pglGUI_ConfigTab.setPosition(screen.width - _pglGUI_ConfigTab.width / 2 + 0, 60)
        _pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 14)
        _pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, 2)

        let _pglConfigModifed = false
        _pglGUI_ConfigTab.onButtonPressed(controller.A, function (selection, selectedIndex) {
            const _pglOptionMin = pglProgCfg.get(selectedIndex).limits.min
            const _pglOptionMax = pglProgCfg.get(selectedIndex).limits.max
            const _pglPromptName = pglProgCfg.get(selectedIndex).name
            const _pglOptionType = pglProgCfg.get(selectedIndex).type
            if (_pglOptionType == "string") {
                settings.writeString(_pglPromptName, game.askForString(_pglPromptName, _pglOptionMax > 0 ? _pglOptionMax : 1));
                console.log(_pglPromptName + ": " + settings.readString(_pglPromptName))
            } else if (_pglOptionType == "number") {
                if (_pglOptionMax >= -255) {
                    let _pgloor = "Range: (" + _pglOptionMin + " - " + _pglOptionMax+") \n"
                       while (true) {
                        let value = game.askForNumber(_pgloor + _pglPromptName, 10)
                        if (value >= _pglOptionMin && value <= _pglOptionMax) {
                            console.log("Value in range")
                            settings.writeNumber(_pglPromptName, value)
                            break
                        } else {
                            _pgloor = " Input of Range (" + _pglOptionMin + "-" + _pglOptionMax+")\n"
                            console.log("Value out of range")
                        }
                    }
                }
                console.log(_pglPromptName + ": " + settings.readNumber(_pglPromptName))
            } else if (_pglOptionType == "boolean") {
                settings.writeNumber(_pglPromptName, +game.ask(_pglPromptName))
                console.log(_pglPromptName + ": " + settings.readNumber(_pglPromptName))
            }
            _pglGUI_ConfigTab.setMenuItems(create_pglMENUITM()) // It took way too long for me to figure out how to make the menu update :sob:
            _pglConfigModifed = true
        })
        _pglGUI_ConfigTab.onButtonPressed(controller.B, function (selection, selectedIndex) {
            _pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)
            _pglGUI_ConfigTab.setButtonEventsEnabled(false)
            _pglCfgMainMenu.setButtonEventsEnabled(true)
            if (_pglConfigModifed == true){
                game.splash("NOTICE:                   ", "Restart to apply changes. ") // The large spaces are used to align the text to the left
            }
        })

        //Menu input handler
        _pglCfgMainMenu.onSelectionChanged(function (selection: string, selectedIndex: number) {
            console.log(selection)

            for (let s of _pglSoftwareInfo) s.setFlag(SpriteFlag.Invisible, true)
            for (let s of _pglDeviceInfo) s.setFlag(SpriteFlag.Invisible, true)
            _pglGUI_ConfigTab.setFlag(SpriteFlag.Invisible, true)

            if (selectedIndex == 0) {  
                for (let s of _pglSoftwareInfo) s.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 1) {
                for (let s of _pglDeviceInfo) s.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 2) {
                _pglGUI_ConfigTab.setFlag(SpriteFlag.Invisible, false)
                }
        })

        _pglCfgMainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 2) {
                _pglGUI_ConfigTab.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
                _pglCfgMainMenu.setButtonEventsEnabled(false)
                _pglGUI_ConfigTab.setButtonEventsEnabled(true)
                _pglConfigModifed = false

            }
        })

        _pglCfgMainMenu.onButtonPressed(controller.menu, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                if(game.ask("NOTICE", "Press A to reboot.")) {
                    control.reset()
                }
            }
        })
    }

    function INIT_RESET_CFG() {
        console.log("INIT_RESET_CFG")
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1000, 1000, 255, 255, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(20)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1000, 1000, 255, 255, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(20)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1000, 1000, 255, 255, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        if (game.ask("RESET DATA?", "!THIS CANNOT BE REVERTED!") == true) {
            if (game.ask("ARE YOU SURE???", "THIS IS YOUR LAST WARNING") == true) {
                pause(200)
                settings.clear()
                console.log("=========================")
                console.log("RESET!")
                console.log("PRESS ANY BUTTON ")
                console.log("=========================")
                control.runInParallel(function () {
                    console.log("AUTO REBOOTING IN 5s")
                    pause(1000)
                    console.log("AUTO REBOOTING IN 4s")
                })
                pauseUntil(() => controller.anyButton.isPressed())
                game.reset()
            } else {
                game.reset()
            }
        } else {
            game.reset()
        }
    }
    function FIRST_STARTUP() {
        console.log("FIRST_STARTUP")
        settings.writeNumber("screenBrightness", screen.brightness())
        settings.writeNumber("speekerVolume", music.volume())
        for (let i = 0; i < pglProgCfg.length; i++) {
            if (pglProgCfg.get(i).type == "string") {
                settings.writeString(pglProgCfg.get(i).name, ""+pglProgCfg.get(i).defaultValue)
                console.log(settings.readString(pglProgCfg.get(i).name))

            } else if (pglProgCfg.get(i).type == "boolean") {
                if (pglProgCfg.get(i).defaultValue == true) {
                    settings.writeNumber(pglProgCfg.get(i).name, 1)
                } else {
                    settings.writeNumber(pglProgCfg.get(i).name, 0)
                }
                console.log(settings.readNumber(pglProgCfg.get(i).name))
            } else if (pglProgCfg.get(i).type == "number") {
                settings.writeNumber(pglProgCfg.get(i).name, +pglProgCfg.get(i).defaultValue)
                console.log(settings.readNumber(pglProgCfg.get(i).name))
            }
        }
        settings.writeNumber("DoneInitialSetup", 1)
    }

    function create_pglMENUITM() {
        let _pglMENUITM_ConfigList: miniMenu.MenuItem[] = []
        console.log("create_pglMENUITM")
        for (let i = 0; i < pglProgCfg.length; i++) {
            if (pglProgCfg.get(i).type == "string") {
                _pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": " + settings.readString(pglProgCfg.get(i).name)))
            } else if (pglProgCfg.get(i).type == "number") {
                _pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": " + settings.readNumber(pglProgCfg.get(i).name)))
            } else if (pglProgCfg.get(i).type == "boolean") {
                switch (settings.readNumber(pglProgCfg.get(i).name)) {
                    case 0:
                        _pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": false"))
                        break
                    case 1:
                        _pglMENUITM_ConfigList.push(miniMenu.createMenuItem(pglProgCfg.get(i).name + ": true"))
                        break
                }
            }
        }
        return (_pglMENUITM_ConfigList)
    }
    export interface ConfigInterface {
        name: string
        type: "boolean" | "number" | "string"
        defaultValue: boolean | number | string
        limits: {
            min: number
            max: number
        }
    }
    export const pglProgCfg: PGL.ConfigInterface[] = []
}
