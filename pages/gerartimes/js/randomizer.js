function alertArea(id,stringError){
    document.getElementById(id).innerHTML = `
    <div class="bg-[#FFA0A0] p-4 rounded-lg  border-blue-500 shadow-md mb-3">
        <p class="font-bold text-[#BD3C00]">⚠️⚠️⚠️</p>
        <p class="text-lg text-[#000000]">${stringError}</p>
    </div>`
}

document.getElementById("btnArea").addEventListener("click", () => {
    let textInput = document.getElementById("inputArea").value;
    if(textInput === ""){
        alertArea("result","Sem nomes para formar o time! Digite pelo menos 2 nomes.")
        return;
    }
    let arrayPlayers = document.getElementById("inputArea").value.split(",").map(p => p.trim())
    let times = []
    for(t = arrayPlayers.length - 1; t > 0; t--){
        let indexRandom = Math.floor(Math.random() * (t + 1))
        let temp = arrayPlayers[t]
        arrayPlayers[t] = arrayPlayers[indexRandom]
        arrayPlayers[indexRandom] = temp
    }
    for(t = 0; t < arrayPlayers.length ; t += 2){
        times.push(arrayPlayers.slice(t, t+2))
    }
    let outputForUser = document.getElementById("result");
    outputForUser.innerHTML = "";
    for(t = 0; t < times.length; t++){
        if(times[t].length === 2){
            outputForUser.innerHTML += `<div class="bg-[#ffe9bd] p-4 rounded-lg  border-blue-500 shadow-md animate-fade-in mb-3">
                <p class="font-bold text-[#BD7E00]">TIME ${t+1}</p>
                <p class="text-lg text-[#000000]">${times[t][0]} <span class="text-[#A1803C]">&</span> ${times[t][1]}</p></div>
        `}
        // else if(textInput == ""){
        //     alertArea("Sem nomes para formar o time! Digite pelo menos 2 nomes.")
        //     return;
        // }
        else{
            outputForUser.innerHTML += `
            <div class="bg-[#FFBEA0] p-4 rounded-lg  border-blue-500 shadow-md mb-3">
                <p class="font-bold text-[#BD3C00]">SOBROU</p>
                <p class="text-lg text-[#000000]">${times[t]}</p>
            </div>`
        }
    }
})

