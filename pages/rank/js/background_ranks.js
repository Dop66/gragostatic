function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bgOutT = document.getElementById('bg-outputrank')
const number = getRandomIntInclusive(1, 7);

bgOutT.innerHTML = `
  <img src="../../assets/BackgroundList/${number}.jpg" class="w-full h-full object-cover opacity-10" alt="">
  <div class="absolute inset-0 bg-black/60"></div>}`