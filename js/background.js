function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bgOut = document.getElementById('bg-output')
const number = getRandomIntInclusive(1, 7);

bgOut.innerHTML = `
    <img src="assets/BackgroundList/${number}.jpg" class="w-full h-full object-cover opacity-10" alt="">
    <div class="absolute inset-0 bg-black/60"></div>}`