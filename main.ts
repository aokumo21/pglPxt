function RUN_PREGAME_ENV(GAME_ver: string) {
    console.log("Check out my github!\n https://github.com/aokumo21/\nEven though there is nothing usefull on there.")
    console.log("=========================")
    console.log("====CONSOLE=LOG=START====")
    console.log("=========================")
    scene.setBackgroundColor(15)
    game.consoleOverlay.setVisible(true)
    pause(50)
    settings.writeString("PREGAME_ver", "0.0.1")
    settings.writeString("GAME_ver", GAME_ver)
    if (settings.readNumber("DoneInitialSetup") == 1) {
        //FIRST_STARTUP()
    }
    console.log("PreGameEnv: " + settings.readString("PREGAME_ver"))
    pause(150)
    // Print device info
    console.log("=========================") 
    console.log("DAL Ver: " + control.deviceDalVersion())
    console.log("RAM SIZE (KB): " + control.ramSize() / 1024)
    console.log("=========================")
    pause(500)
    if (controller.A.isPressed() && (controller.B.isPressed() && controller.up.isPressed())) {
        INIT_RESET_CFG()
    } else if (controller.A.isPressed() && (controller.B.isPressed() && controller.down.isPressed())) {
        DBG_PRNT_CFG()
    }
    console.log("PROGRAM NAME:\n" + control.programName()) //Print programName
    console.log("PROGRAM VERSION:") //Print programVersion
    if (settings.readNumber("DEBUG") == 1) {
        settings.writeString("GAME_ver", settings.readString("GAME_ver") + "-DEBUG")
    }
    console.log(settings.readString("GAME_ver") + "\n ")

    screen.setBrightness(settings.readNumber("screenBrightness"))
    console.log("screenBrightness == " + settings.readNumber("screenBrightness"))

    music.setVolume((settings.readNumber("speekerVolume")))
    console.log("speekerVolume == " + settings.readNumber("speekerVolume"))

    if (settings.readNumber("DBG_DELAYED_STARTUP") == 1) {
        console.log(" \nDELAYED STARTUP ENABLED")
        pause(5000)
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