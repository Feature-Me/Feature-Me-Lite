interface gameConfig {
    graphics: {
        musicgame: {
            renderType: "3D" | "2D"
            behaviorName: string
            resolution: number
            fps: number
        }
    }
    gameplay: {
        key: Array<string>
        scrollSpeed: number
        mirror: boolean
        random: boolean
        fieldWall: false | number
        effect: {
            cameraShaking: boolean
        }
        timing: {
            offset: number
            judge: number
        }
        background: {
            mode: "solid" | "2D"
            color: string
            allowImage: boolean
            allowVideo: boolean
        }
        judgeText:{
            show:boolean
            direction:number
            position:number
        }
    }
    audio: {
        masterVolume: number
        musicVolume: number
        effectVolume: number
        audioStereo: number
        positional: boolean
        positionalIntensity:number
    }
}
