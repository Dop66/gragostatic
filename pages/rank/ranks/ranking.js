// link api
// const infoPlayers = [
//     "http://localhost:3000/api/rank?nick=Linguiça%20Games&tag=br12",
// ]
const apiURL = "https://gragos-api.vercel.app/api/rank?nick=Linguiça%20Games&tag=br12";

async function carregarRank() {
    const container = document.getElementById('container-dos-cards');
    container.innerHTML = '<p class="text-white text-center animate-pulse">Buscando dados na Riot...</p>';

    try {
        const resposta = await fetch(apiURL);
        const dadosCompletos = await resposta.json();

        const elos = dadosCompletos.elos;
        const soloQ = elos.find(fila => fila.queueType === "RANKED_SOLO_5x5");
        const flex = elos.find(fila => fila.queueType === "RANKED_FLEX_SR");

        const nomeReal = `${dadosCompletos.nome} #${dadosCompletos.tag}`;
        console.log("Jogador encontrado:", nomeReal);

        container.innerHTML = `
                <div class="bg-white p-6 rounded-lg w-full border border-blue-500 shadow-md flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <img src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon2075.jpg?image=q_auto:good,f_webp,w_200&v=1773443739" alt="Logo do Jogador" class="w-14 h-14 rounded-full border-2 border-gray-200 object-cover">
                        
                        <div class="flex flex-col justify-center">
                            <p class="text-[#0d0d0d] font-bold text-xl leading-none mb-1">#1</p>
                            <p class="font-bold text-[#BD3C00] text-lg leading-none">${nomeReal}</p>
                        </div>
                        
                    </div>
                    
                    <div class="flex flex-row items-center gap-8">
                        
                        <div class="flex flex-col items-center text-sky-950">
                            <p class="text-sm font-semibold mb-1">SOLO/DUO</p>
                            <img src="assets/elos_assets/5.png" alt="rank" class="w-[80px]">
                            <p class="font-bold mt-1">${soloQ.leaguePoints}</p>
                        </div>
                        
                        <div class="flex flex-col items-center text-sky-950">
                            <p class="text-sm font-semibold mb-1">FLEX</p>
                            <img src="assets/elos_assets/5.png" alt="rank" class="w-[80px]">
                            <p class="font-bold mt-1">${flex.leaguePoints}</p>
                        </div>

                    </div>
                    
                </div>
        `;

    } catch (erro) {
        container.innerHTML = '<p class="text-red-500 text-center font-bold">Erro ao carregar os Ranks. O Proxy está ligado?</p>';
        console.error(erro);
    }
}

carregarRank();