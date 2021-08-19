let music


function songPlay(){
    if (!music.isPlaying() ){
        music.play()
        music.setVolume(0.5)
    }
}
