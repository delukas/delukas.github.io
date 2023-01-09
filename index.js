document.getElementById('form').onsubmit = (e) => {
    e.preventDefault()

    /* Hallo Jens :) */ 

    const SOUND_LENGTH = 130
    const ROTATION = 3

    const sequence = document.getElementById("Sequence").value
    const volume = document.getElementById("Volume").value
    const hertz = {
        "A": document.getElementById("Sound_A").value,
        "B": document.getElementById("Sound_B").value,
        "C": document.getElementById("Sound_C").value,
        "-": 0
    }
    
    var p_error = document.getElementById('error')
    
    if(sequence.length !== 8) return p_error.innerText += 'Invalid Sequence'
    if(!sequence.match('[ABC-]{8}')) return p_error.innerText += 'Not Matching'

    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(!ctx) return p_error.innerText += 'AudioContext missing'
    try{
    var osc = ctx.createOscillator()
    var gain = ctx.createGain()
    osc.type = "sine"
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.value = volume

    for(var i = 0; i < sequence.length; i++){
        for(var i2 = 0; i2 < ROTATION; i2++){
            osc.frequency.setValueAtTime(hertz[sequence.charAt(i).toUpperCase()], (i+i2*sequence.length)*SOUND_LENGTH/1000)
        }
    }

    osc.start()
    osc.stop(sequence.length*SOUND_LENGTH*ROTATION/1000)
    
    }catch(error){
        return p_error.innerText += error
    }
}
