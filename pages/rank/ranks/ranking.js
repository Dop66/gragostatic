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

const delay = (ms) => new Promise(res => setTimeout(res, ms));

let friendCheked = [];

function colorScore(points){
    const pointsConvert = parseInt(points);

    if(pointsConvert === 0){
        return `#5c5c5c`;
    }else if(pointsConvert <= 2000){
        return `#fab375`;
    }else if(pointsConvert <= 5000){
        return `#56f07f`;
    }else if(pointsConvert <= 7000){
        return `#9e7fe3`;
    }else if(pointsConvert <= 10000)
        return `#9b59b6`
    else{
        return `#ff007f`;
    }
}

async function carregarRank() {

    const container = document.getElementById('container-cards');
    const loading = document.getElementById('loading');

    // const playersReady = [];
    
    for(t = 0; t < infoPlayers.length; t++){
        try {

            const resposta = await fetch(infoPlayers[t]);
            const dadosCompletos = await resposta.json();
            const responseAPI = await fetch(infoPlayers[t]);

            loading.innerHTML = `
                <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-neutral-tertiary animate-spin fill-[#eb8c34]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            `;
            if(!responseAPI.ok){
                container.innerHTML = '<p class="text-red-500 text-center font-bold">Erro com a API</p>';
                console.log(`[ERRO] Possivel erro em ${infoPlayers[t]}, lendo proximos players do array}`);
                loading.innerHTML = "";
                continue;
            }

            const id = dadosCompletos.iconeId;
            const urlImage = "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/profileicon/" + id + ".png";

            const elos = dadosCompletos.elos;
            const soloQ = elos.find(fila => fila.queueType === "RANKED_SOLO_5x5");
            const flex = elos.find(fila => fila.queueType === "RANKED_FLEX_SR");

            const username = `${dadosCompletos.nome} #${dadosCompletos.tag}`;

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

            const division = {
                "I": 500,
                "II": 600,
                "III": 700,
                "IV": 800,
            }

            let calcScore = parseInt(((pointsElos[rankName] || 0) + (division[rank] || 0) + pdl) + ((pointsElos[rankNameFlex] || 0) / 1.5));
            // let calcScore = ((pointsElos[rankName] || 0) + (pointsElos[rankNameFlex] || 0) + pdl)
            
            let friendCheckList = {
                name: username,
                topRank: 0,
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

    var temp = 0;

    friendCheked.forEach((friend) => {
        temp += 1;
        loading.innerHTML = "";
        container.innerHTML += `
                <div class="backdrop-blur-md p-4 md:p-6 border-2 border-[${colorScore(friend.score)}] w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                    <div class="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <img src="${friend.icon}" alt="Logo do Jogador" class="w-20 h-20 md:w-24 md:h-24 object-cover border border-[#8FE3EC]/30">
                        
                        <div class="flex flex-col justify-center">
                            <p class="text-lg md:text-xl text-[#98E8EE] font-bold leading-tight mb-2 md:mb-0">#${temp} ${friend.name}</p>
                            
                            <div class="mt-2 text-xs flex flex-col gap-1 items-center md:items-start">
                                <p class="px-2 py-1 bg-[#00C5CD]/10 backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Solo/Duo: ${friend.rank} ${friend.rankdiv}</p>
                                <p class="px-2 py-1 bg-[#00C5CD]/10 backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Flex: ${friend.rankdivFlex} ${friend.rankFlex}</p>
                                <p class="px-2 py-1 bg-[${colorScore(friend.score)}]/65 font-bold backdrop-blur-md border border-[#00C5CD]/20 rounded w-fit">Score: <span class="text-[#f1f5f9]">${friend.score}</span></p>
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
    await delay(600);
}

carregarRank();