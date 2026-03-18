// link api
const infoPlayers = [
    "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12",
    "https://gragos-api.vercel.app/api/rank?nick=Ajuda%20czao&tag=0027",
    "https://gragos-api.vercel.app/api/rank?nick=RoscoTToneツツツ&tag=jesus",
    // "https://gragos-api.vercel.app/api/rank?nick=melt&tag=3123",
]
// const apiURL = "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12";

async function carregarRank() {
    const container = document.getElementById('container-dos-cards');
    // container.innerHTML = '<p class="text-white text-center animate-pulse">Buscando dados na Riot...</p>';
    for(t = 0; t < infoPlayers.length; t++){
        try {
            const resposta = await fetch(infoPlayers[t]);
            const dadosCompletos = await resposta.json();

            const id = dadosCompletos.iconeId;
            const urlImage = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + id + ".png";

            const elos = dadosCompletos.elos;
            const soloQ = elos.find(fila => fila.queueType === "RANKED_SOLO_5x5");
            const flex = elos.find(fila => fila.queueType === "RANKED_FLEX_SR");

            const nomeReal = `${dadosCompletos.nome} #${dadosCompletos.tag}`;
            // console.log("Jogador encontrado:", nomeReal);
            if(soloQ.leaguePoints != undefined){
                container.innerHTML += `
                        <div class="bg-[#000000]/80 backdrop-blur-md p-6 rounded-lg w-full border border-blue-500 shadow-md flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <img src="${urlImage}" alt="Logo do Jogador" class="w-14 h-14 rounded-full border-2 border-gray-200 object-cover">
                                
                                <div class="flex flex-col justify-center">
                                    <!-- <p class="text-[#0d0d0d] font-bold text-xl leading-none mb-1">#2</p> --!>
                                    <p class="font-bold text-[#BD3C00] text-lg leading-none">${nomeReal}</p>
                                </div>
                                
                            </div>
                            
                            <div class="flex flex-row items-center gap-8">
                                
                                <div class="flex flex-col items-center text-sky-950 text-white">
                                    <p class=" font-semibold mb-1">SOLO/DUO</p>
                                    <img src="assets/elos_assets/5.png" alt="rank" class="w-[80px]">
                                    <p class="font-bold mt-1">${soloQ.leaguePoints} PDL</p>
                                </div>
                                
                                <div class="flex flex-col items-center text-sky-950 text-white">
                                    <p class="text-sm font-semibold mb-1">FLEX</p>
                                    <img src="assets/elos_assets/5.png" alt="rank" class="w-[80px]">
                                    <p class="font-bold mt-1">${flex.leaguePoints} PDL</p>
                                </div>

                            </div>
                            
                        </div>
                `;
                }else if(soloQ.leaguePoints === undefined){
                    alert("ERRO AQUI")
                }
                else{
                    // console.log(soloQ.leaguePoints)
                }
        } catch (erro) {
            container.innerHTML = '<p class="text-red-500 text-center font-bold">Erro ao carregar os Ranks. O Proxy está ligado?</p>';
            // console.error(erro);
        }
    }
}

carregarRank();