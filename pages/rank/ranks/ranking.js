// link api
const infoPlayers = [
    "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12",
    "https://gragos-api.vercel.app/api/rank?nick=Ajuda%20czao&tag=0027",
    "https://gragos-api.vercel.app/api/rank?nick=RoscoTToneツツツ&tag=jesus",
    "https://gragos-api.vercel.app/api/rank?nick=melt&tag=3123",
    "https://gragos-api.vercel.app/api/rank?nick=RANDOM%20MONKEY&tag=idis",
    "https://gragos-api.vercel.app/api/rank?nick=244&tag=twicy",
    "https://gragos-api.vercel.app/api/rank?nick=Tezãolin&tag=5211",
    "https://gragos-api.vercel.app/api/rank?nick=Vinis%20The%20Reaper&tag=C4o",
    "https://gragos-api.vercel.app/api/rank?nick=totigamer&tag=BR1",

]

let friendCheked = [];

function colorScore(points){
    const pointsConvert = parseInt(points);

    if(pointsConvert === 0){
        return `bg-[#5c5c5c]/65`;
    }else if(pointsConvert <= 1000){
        return `bg-[#f07056]/65`;
    }else if(pointsConvert <= 5000){
        return `bg-[#f0e056]/65`;
    }else{
        return `bg-[#56f07f]/65`;
    }
}

// const apiURL = "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12";

async function carregarRank() {
    const container = document.getElementById('container-cards');

    // container.innerHTML = '<p class="text-white text-center animate-pulse">Buscando dados na Riot...</p>';
    // const playersReady = [];
    
    for(t = 0; t < infoPlayers.length; t++){
        try {
            const resposta = await fetch(infoPlayers[t]);
            const dadosCompletos = await resposta.json();

            const id = dadosCompletos.iconeId;
            const urlImage = "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/profileicon/" + id + ".png";

            const elos = dadosCompletos.elos;
            const soloQ = elos.find(fila => fila.queueType === "RANKED_SOLO_5x5");
            const flex = elos.find(fila => fila.queueType === "RANKED_FLEX_SR");

            const username = `${dadosCompletos.nome} #${dadosCompletos.tag}`;
            // console.log("Jogador encontrado:", nomeReal);
            let rankName = "UNRANKED"
            let pdl = 0;
            let rank = "";
            
            let rankNameFlex = "UNRANKED"
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

            // Pontuação
            const pointsElos = {
                "IRON": 1000,
                "BRONZE": 2000,
                "SILVER": 3000,
                "GOLD": 4000,
                "PLATINUM": 5000,
                "EMERALD": 6000,
                "DIAMOND": 7000,
                "MASTER": 8000,
                "GRANDMASTER": 9000,
                "CHALLENGER": 10000,
                "UNRANKED": 0
            };

            // let calcScore = ((pointsElos[rankName] || 0) + (pointsElos[rankNameFlex] || 0) + pdl)
            let calcScore = (pointsElos[rankName] || 0) + pdl;

            let friendCheckList = {
                name: username,
                // Solo/Duo
                rank: rankName,
                rankdiv: rank,
                pdl: pdl,
                rankIcons: rankImages,
                // flex
                rankFlex: rankFlex,
                rankdivFlex: rankNameFlex,
                pdlFlex: pdlFlex,
                iconsFlex: rankImagesFlex,
                // icons
                icon: urlImage,
                // Score
                score: calcScore,
            };
            
            friendCheked.push(friendCheckList);
            

        } catch (erro) {
            container.innerHTML = '<p class="text-red-500 text-center font-bold">Erro ao carregar os Ranks.</p>';
            console.error(erro);
        }
    }

    friendCheked.sort((playerA, playerB) => {
        return playerB.score - playerA.score;
    })
    friendCheked.forEach((friend) => {
        container.innerHTML += `
                <div class="backdrop-blur-md p-4 md:p-6 border-2 border-[#8FE3EC] w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                    
                    <div class="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <img src="${friend.icon}" alt="Logo do Jogador" class="w-20 h-20 md:w-24 md:h-24 object-cover border border-[#8FE3EC]/30">
                        
                        <div class="flex flex-col justify-center">
                            <p class="text-lg md:text-xl text-[#98E8EE] font-bold leading-tight mb-2 md:mb-0">${friend.name}</p>
                            
                            <div class="mt-2 text-xs flex flex-col gap-1 items-center md:items-start">
                                <p class="px-2 py-1 bg-[#00C5CD]/10 backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Solo/Duo: ${friend.rank} ${friend.rankdiv}</p>
                                <p class="px-2 py-1 bg-[#00C5CD]/10 backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Flex: ${friend.rankdivFlex} ${friend.rankFlex}</p>
                                <p class="px-2 py-1 ${colorScore(friend.score)} font-bold backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Score: <span class="text-[#f1f5f9]">${friend.score}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-around md:justify-end gap-6 md:gap-8 w-full md:w-auto border-t border-[#8FE3EC]/20 pt-4 md:pt-0 md:border-t-0">
                            
                        <div class="flex flex-col items-center text-white">
                            <p class="text-[10px] md:text-xs font-semibold mb-1 opacity-70 uppercase tracking-widest">SOLO/DUO</p>
                            <img src="${friend.rankIcons}" alt="rank" class="w-[60px] md:w-[80px] drop-shadow-[0_0_8px_rgba(143,227,236,0.3)]">
                            <p class="font-bold mt-1 text-sm md:text-base">${friend.pdl} <span class="text-[10px] font-normal">PDL</span></p>
                        </div>
                            
                        <div class="flex flex-col items-center text-white">
                            <p class="text-[10px] md:text-xs font-semibold mb-1 opacity-70 uppercase tracking-widest">FLEX</p>
                            <img src="${friend.iconsFlex}" alt="rank" class="w-[60px] md:w-[80px] drop-shadow-[0_0_8px_rgba(143,227,236,0.3)]">
                            <p class="font-bold mt-1 text-sm md:text-base">${friend.pdlFlex} <span class="text-[10px] font-normal">PDL</span></p>
                        </div>

                    </div>
                        
                </div>
            
        `;
    });
}

carregarRank();