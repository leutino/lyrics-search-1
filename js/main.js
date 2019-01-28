/* ovo ovde su konstante ili varijable, vec kako se zeli, u kojima se ubacuju vrednosti koje se dohvataju za razne ID-jeve preko metoda 'getElementById'*/
const tekstPesme = document.getElementById('tekst-pesme') //vezuje se za div u HTML-u u kojem se ubacuje tekst pesme
const naslovPesme = document.getElementById('naslov-pesme') //vezuje se za h1 u HTML-u u kojem se ubacuje naziv izvodjaca i imena pesme
const forma = document.getElementById('forma') //ovde se dohvata forma tj. labele i polja za unos izvodjaca i pesama kao i dugme 'potrazi'
const trazeniIzvodjac = document.getElementById('trazeni-izvodjac') //ova promenljiva se konkretno vezuje za polje unosa imena izvodjaca
const trazenaPesma = document.getElementById('trazena-pesma') //ova promenljiva se vezuje za polje unosa trazene pesme

/*Ovde krece izvrsavanje funkcije*/

function ucitajPodatke() {
const izvodjac = trazeniIzvodjac.value //Uzima se ime izvodjaca iz polja za unos
const pesma = trazenaPesma.value  //Uzima se ime pesme iz polja za unos


/* Ovo je URL adresa sa koje se dohvacaju tekstovi pesama. U sustini, na toj adresi je API koji ti dohvatas i prezentujes ga na svom sajtu. API bi trebalo da 
predstavlja bazu podataka necega, a u ovom slucaju tekstova pesama. Znaci ti trazis neki tekst nekog izvodjaca i pristupas API-ju na ovoj adresi i od njega
trazis da ti dostavi trazeni tekst pesme i ukoliko ga ima u svojoj bazi on ti ga dostavlja i ti mozes da ga postavis na svojoj stranici. Na internetu ima
jako puno razlicitih API-ja za pesme, a ovaj je jedan od njih, u pitanju je neki nas covek. 
Ove 2 linije ispod(od kojih je jedna zakomentarisana) predstavljaju 2 razlicia nacina na koji ti mozes dobaviti tekst pesme sa konkretnog API-ja. Ovaj
zakomentarisani nacin je stariji i u novije vreme se korisi vise ovaj ispod, onaj koji nije zakomentarisan */

// const url = 'https://api.lyrics.ovh/v1/' + izvodjac + '/' + pesma 
const url = `https://api.lyrics.ovh/v1/${izvodjac}/${pesma}`   //Ovo sam gore opisao, unosi se url stranice od koje cemo dobiti tekst za trazeno ime izvodjaca i pesme
// console.log(url);
fetch(url)  // Takodje vec opisano, dohvatamo tj. pristupamo stranici tj.njenom Api-ju sa yahtevom iz URL-a
   .then(response => response.json()) //Ovo je tip funkcije koji se zove 'arrow' i nema ime 'function' u sebi. Skoro isto radi kao i klasicna funkcija. Kokretno ovde se trazeni rezultat(u nasem slucaju tekst pesme)isporucuje u JSON formatu.
   .then(objekat => {                //Ovo drugo 'then' treba da JSON format pretvori u onaj koji je razumljiv brauzeru, valjda
    //    console.log(objekat.lyrics)
 
    naslovPesme.innerText = izvodjac + ' - ' + pesma                                //ovde se taj prevod svodi na upisivanju izvodjaca i pesme u HTML dokument
    tekstPesme.innerText = objekat.lyrics ? objekat.lyrics : 'Nema trazenog teksta'  /*ovde se 'prevedeni' tekst pesme upisuje u HTML stranicu. Koristi se 'innerText'
                                                                                      umesto dosadasnjeg 'innerHTML' zato sto prenese tekst pesme onako kako i povuce 
                                                                                      sa sajta, a to je sa odvojenim strofama i stihovima dok innerHTML upisuje onako
                                                                                      bez ikakve forme sve dok ima prostora u recenici. Ono ? je tzv. ternarni operater
                                                                                      koji zamenjuje funkciju 'if', a u ovom slucaju nam kaze ucitaj tekst pesme(o je ono
                                                                                    objekat.lyrics), ali ako nema tog teksta u bazi onda ispisi 'Nema trazenog teksta'
                                                                                     (to je ono ? objekat.lyrics)*/
    
   })
}
forma.addEventListener('submit', function(e){  //Prilikom kliktanja na dugme "potrazi" ili prilikom pritiska na taster "ENTER" pokrece se funkcija "ucitajPodatke()"
    e.preventDefault();//sprecava podrazumevano ponasanje, u ovom slucaju sprecava da forma ne refresuje stranicu automatski
    ucitajPodatke();
})
