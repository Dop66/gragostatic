// link api
const infoPlayers = [
    "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12",
    "https://gragos-api.vercel.app/api/rank?nick=Ajuda%20czao&tag=0027",
    "https://gragos-api.vercel.app/api/rank?nick=RoscoTToneツツツ&tag=jesus",
    "https://gragos-api.vercel.app/api/rank?nick=melt&tag=3123",
    "https://gragos-api.vercel.app/api/rank?nick=RANDOM%20MONKEY&tag=idis",
    "https://gragos-api.vercel.app/api/rank?nick=xocottone&tag=shaco",
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
                "I": 800,
                "II": 700,
                "III": 600,
                "IV": 500,
            }

            let calcScore = parseInt((pointsElos[rankName] || 0) + (division[rank] || 0) + pdl);
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
        <div class="player-card relative flex flex-col md:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 overflow-hidden transition-all duration-200 hover:border-white/20 w-full">
            
            <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style="background: ${colorScore(friend.score)}"></div>

            <span class="hidden md:block text-[11px] font-bold tracking-widest w-6 text-right shrink-0" style="color: ${colorScore(friend.score)}">#${temp}</span>

            <img 
            src="${friend.icon}" 
            alt="Logo do Jogador" 
            class="w-12 h-12 md:w-11 md:h-11 rounded-[10px] border border-white/10 object-cover shrink-0"
            >

            <div class="flex-1 min-w-0 text-center md:text-left">
            <p class="player-name text-sm font-bold text-white leading-none mb-1 truncate">
                <span class="md:hidden" style="color: ${colorScore(friend.score)}">#${temp} </span>${friend.name}
            </p>
            <span class="inline-block text-[10px] font-medium text-white/40 bg-white/5 border border-white/10 rounded-full px-2 py-[2px]">
                Score: ${friend.score}
            </span>
            </div>

            <div class="flex flex-row items-center justify-around md:justify-end gap-6 w-full md:w-auto border-t border-white/10 pt-4 md:pt-0 md:border-t-0">

            <div class="flex flex-col items-center text-white">
                <p class="text-[9px] font-medium tracking-widest text-white/30 uppercase mb-1">Solo/Duo</p>
                <img src="${friend.rankIcons}" alt="rank" class="w-14 md:w-16 drop-shadow-[0_0_8px_rgba(143,227,236,0.25)]">
                <p class="text-xs font-bold mt-1">${friend.rank} ${friend.rankdiv}</p>
                <p class="text-[10px] text-white/40 mt-[2px]">${friend.pdl} <span class="font-normal">PDL</span></p>
            </div>

            <div class="w-px h-8 bg-white/10 shrink-0 hidden md:block"></div>

            <div class="flex flex-col items-center text-white">
                <p class="text-[9px] font-medium tracking-widest text-white/30 uppercase mb-1">Flex</p>
                <img src="${friend.iconsFlex}" alt="rank" class="w-14 md:w-16 drop-shadow-[0_0_8px_rgba(143,227,236,0.25)]">
                <p class="text-xs font-bold mt-1">${friend.rankdivFlex} ${friend.rankFlex}</p>
                <p class="text-[10px] text-white/40 mt-[2px]">${friend.pdlFlex} <span class="font-normal">PDL</span></p>
            </div>

            </div>
        </div>
        `;
    });
    await delay(600);
}



carregarRank();