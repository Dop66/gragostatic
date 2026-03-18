// link api
const infoPlayers = [
    "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12",
    "https://gragos-api.vercel.app/api/rank?nick=Ajuda%20czao&tag=0027",
    "https://gragos-api.vercel.app/api/rank?nick=RoscoTToneツツツ&tag=jesus",
    "https://gragos-api.vercel.app/api/rank?nick=melt&tag=3123",
    "https://gragos-api.vercel.app/api/rank?nick=RANDOM%20MONKEY&tag=idis",
    "https://gragos-api.vercel.app/api/rank?nick=244&tag=twicy",
]


// const apiURL = "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12";

async function carregarRank() {
    const container = document.getElementById('container-dos-cards');
    // container.innerHTML = '<p class="text-white text-center animate-pulse">Buscando dados na Riot...</p>';
    // const playersReady = [];
    
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
            let rankNameSolo = "UNRANKED"
            let pdl = 0;
            let rank = "";
            
            let rankNameSoloFlex = "UNRANKED"
            let pdlFlex = 0;
            let rankFlex = "";

            if(soloQ){
                rankName = soloQ.tier; // ELO
                rank = soloQ.rank; // DIVISAO
                pdl = soloQ.leaguePoints; // PDL
            }
            if(flex){
                rankNameFlex = flex.tier;
                pdlFlex = flex.leaguePoints;
                rankFlex = flex.rank;
            }

            const rankImages = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${rankName.toLowerCase()}.png`;
            const rankImagesFlex = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${rankNameFlex.toLowerCase()}.png`;

            console.log(rankName)
            container.innerHTML += `
                    <div class=" backdrop-blur-md p-6 border-2 border-[#8FE3EC] w-full flex items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <img src="${urlImage}" alt="Logo do Jogador" class="w-24 h-24 object-cover">
                            <!--<div class="fixed inset-0 -z-10 overflow-hidden blur-[4px] bg-[#000000]/80 rounded-[50px]">
                                <img src="${urlImage}" class="fixed inset-0 -z-10 w-full h-full object-cover opacity-30" alt="background">
                            </div>--!>
                            <div class="flex flex-col justify-center">
                                <!-- <p class="text-[#0d0d0d] font-bold text-xl leading-none mb-1">#2</p> --!>
                                <p class="flex-auto text-[#98E8EE] leading-none">${nomeReal}</p>
                                <div class="m-4 text-sm text-center">
                                    <p class="bg-[#00C5CD]/10 backdrop-blur-md text-xs mb-2 w-38">Solo/Duo ${rankName} ${rank}</p>
                                    <p class="bg-[#00C5CD]/10 backdrop-blur-md text-xs">FLEX ${rankName} ${rank}</p>
                                </div>
                            </div>
                                
                            </div>
                            
                        <div class="flex flex-row items-center gap-8">
                                
                            <div class="flex flex-col items-center text-sky-950 text-white">
                                <p class=" font-semibold mb-1">SOLO/DUO</p>
                                <img src="${rankImages}" alt="rank" class="w-[80px]">
                                <p class="font-bold mt-1">${pdl} PDL</p>
                            </div>
                                
                            <div class="flex flex-col items-center text-sky-950 text-white">
                                <p class="text-sm font-semibold mb-1">FLEX</p>
                                <img src="${rankImagesFlex}" alt="rank" class="w-[80px]">
                                <p class="font-bold mt-1">${pdlFlex} PDL</p>
                            </div>

                        </div>
                            
                    </div>
                `;
        } catch (erro) {
            container.innerHTML = '<p class="text-red-500 text-center font-bold">Erro ao carregar os Ranks.</p>';
            console.error(erro);
        }
    }
}

carregarRank();