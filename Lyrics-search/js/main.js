const tekstPesme = document.getElementById('tekst-pesme')
const naslovPesme = document.getElementById('naslov-pesme')
const forma = document.getElementById('forma')
const trazeniIzvodjac = document.getElementById('trazeni-izvodjac')
const trazenaPesma = document.getElementById('trazena-pesma')


function ucitajPodatke() {
const izvodjac = trazeniIzvodjac.value
const pesma = trazenaPesma.value


// const url = 'https://api.lyrics.ovh/v1/' + izvodjac + '/' + pesma
const url = `https://api.lyrics.ovh/v1/${izvodjac}/${pesma}`

// console.log(url);
fetch(url)
   .then(response => response.json())
   .then(objekat => {
    //    console.log(objekat.lyrics)
    //    document.getElementById('toto').innerHTML = objekat.lyrics
    naslovPesme.innerText = izvodjac + ' - ' + pesma
    tekstPesme.innerText = objekat.lyrics ? objekat.lyrics : 'Nema trazenog teksta'
    
   })
}
forma.addEventListener('submit', function(e){
    e.preventDefault();//spreci podrazumevano ponasanje, u ovom slucaju sprecava da forma ne refresuje stranicu automatski
    ucitajPodatke();
})
