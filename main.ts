namespace PreGameEnv {
    export function RUN_PREGAME_ENV(GAME_ver: string) {
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
        console.log("Check out my github!\n https://github.com/aokumo21/\nEven though there is nothing usefull on there.")
        console.log("=========================")
        console.log("====CONSOLE=LOG=START====")
        console.log("=========================")
        scene.setBackgroundColor(15)
        game.consoleOverlay.setVisible(true)
        settings.writeString("PREGAME_ver", "0.0.1")
        settings.writeString("GAME_ver", GAME_ver)
        if (settings.readNumber("DoneInitialSetup") != 1) {
            FIRST_STARTUP()
        }
        console.log("PreGameEnv: " + settings.readString("PREGAME_ver"))
        // Print device info
        pause(100)
        console.log("=========================") 
        console.log("DAL-Ver: " + control.deviceDalVersion())
        console.log("RAM-Size (KB): " + control.ramSize() / 1024)
        console.log("=========================")
        pause(200)
        //if (controller.A.isPressed() && (controller.B.isPressed() && controller.up.isPressed())) {
        //    INIT_RESET_CFG()
        //} else if (controller.A.isPressed() && (controller.B.isPressed() && controller.down.isPressed())) {
        //    DBG_PRNT_CFG()
        //}
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
        scene.setBackgroundColor(3)
        
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
}
