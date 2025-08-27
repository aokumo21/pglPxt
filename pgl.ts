namespace PGL {
    export const PGL_ver = "0.0.1"
    export function RUN(GAME_ver: string, GAME_Author: string) {
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
        console.log("Check out my github!\n https://github.com/aokumo21/ \nEven though there is nothing usefull on there.")
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
        console.log("PreGameLauncher: " + PGL_ver)
        // Print device info
        pause(100)
        console.log("=========================") 
        console.log("DAL-Ver: " + control.deviceDalVersion())
        console.log("RAM-Size (KB): " + control.ramSize() / 1024)
        console.log("=========================")
        pause(200)
        if (controller.A.isPressed() && (controller.B.isPressed() && controller.up.isPressed())) {
            INIT_RESET_CFG()
        } else if (controller.A.isPressed() && (controller.B.isPressed() && controller.down.isPressed())) {
            DBG_PRNT_CFG()
        }
        console.log("Program:\n" + control.programName()) //Print programName

        if (settings.readNumber("DEBUG") == 1) {
            settings.writeString("GAME_ver", settings.readString("GAME_ver") + "-DEBUG")
        }
        console.log("Version: " + settings.readString("GAME_ver")) //Print programVersion
        console.log("=========================")
        pause(1000)
        //if (controller.A.isPressed() && controller.B.isPressed()){
            CFG_SCRN()
        //}
        screen.setBrightness(settings.readNumber("screenBrightness"))
        music.setVolume((settings.readNumber("speekerVolume")))

        if (settings.readNumber("DBG_DELAYED_STARTUP") == 1) {
            console.log(" \nDELAYED STARTUP ENABLED")
            pause(5000)
        }
    }

    function CFG_SCRN() {
        console.log("CFG_SCRN")
        game.pushScene()
        game.consoleOverlay.setVisible(false)
        scene.setBackgroundColor(14)

        //TopBarBackgroundImage
        let tbbi = image.create(screen.width, 12)
        tbbi.fill(2)

        //TopBarBackgroundSprite
        let tbbs = sprites.create(tbbi, SpriteKind.Player)
        tbbs.setPosition(tbbs.width / 2, tbbs.height / 2)

        function createTextSprite(text: string, x: number, y: number){
            let sprite = textsprite.create(text, 0, 2)
            sprite.setPosition(sprite.width / 2 + x, y)
            sprite.setFlag(SpriteFlag.Invisible, true)
                if (text== "uptime"){
                    game.onUpdateInterval(1000, function () {
                        sprite.setText("Uptime: " + Math.trunc(control.millis() / 1000) + "s")
                    })
                }
            return sprite
        }

        let CfgMainMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("Software"),
            miniMenu.createMenuItem("System"),
            miniMenu.createMenuItem("Config"),
            miniMenu.createMenuItem("Dbg"),
        )

        CfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
        CfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 1)
        CfgMainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 1)

        CfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 14)
        CfgMainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 2)

        CfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 2)
        CfgMainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 14)

        CfgMainMenu.setPosition(CfgMainMenu.width / 2 + 2, CfgMainMenu.height / 2 - 1)

        let softwareInfo = [
            createTextSprite("-=Launcher===--------------", 0, 18),
            createTextSprite("PreGameLauncher: " + PGL_ver, 0, 26),
            createTextSprite("DAL-VER: " + control.deviceDalVersion(), 0, 34),
            createTextSprite("-=Program===---------------", 0, 42,),
            createTextSprite(control.programName(), 0, 50),
            createTextSprite("ProgHash: "+ control.programHash(), 0, 58),
            createTextSprite("Ver: " + settings.readString("GAME_ver"), 0, 66),
            createTextSprite("Author: " + settings.readString("GAME_Author"), 1, 74),
            createTextSprite("---------------------------", 0, 109),
            createTextSprite(`github.com/aokumo21/PGLpxt`, 2, 116)
        ]

        let deviceInfo = [
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

        // Update uptime every second
        game.onUpdateInterval(1000, function () {
            //CfgUptimeText.setText("Uptime: " + Math.trunc(control.millis() / 1000) + "s")
        })


        CfgMainMenu.onSelectionChanged(function (selection: string, selectedIndex: number) {
            console.log(selection)

            for (let s of softwareInfo) s.setFlag(SpriteFlag.Invisible, true)
            for (let s of deviceInfo) s.setFlag(SpriteFlag.Invisible, true)

            if (selectedIndex == 0) {  
                for (let s of softwareInfo) s.setFlag(SpriteFlag.Invisible, false)
            } else if (selectedIndex == 1) {
                for (let s of deviceInfo) s.setFlag(SpriteFlag.Invisible, false)
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
        settings.writeNumber("DoneInitialSetup", 1)
    }
    function DBG_PRNT_CFG() {
        console.log("DBG_PRNT_CFG")
        console.log("=========================")
        let dbg_settings_list = settings.list()
        for (let index = 0; index <= dbg_settings_list.length - 1; index++) {
            console.log("" + dbg_settings_list[index] + " = \"" + settings.readNumber(dbg_settings_list[index]) + "\" / \"" + settings.readString(dbg_settings_list[index]) + "\"")
            console.log("=========================")
        }
        pause(5000)
    }
    export interface ConfigInterface {
        name: string
        type: "boolean" | "number" | "string"
        value: boolean | number | string
        limits?: {
            min?: number
            max?: number
        }
    }

}
