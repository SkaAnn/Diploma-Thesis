# Diploma-Thesis
Ponukovo-dopytovo orientované informačné systémy // Supply-demand oriented information systems
<br/>
Aplikácia je verejne dostupná na adrese https://segian.herokuapp.com/
<br/>
Pri vývoji aplikácie sme používali vývojové prostredie Visual Studio Code

## Rozbehanie aplikácie
Po stiahnutí repozitára, treba zadať do VS Code terminálu tieto príkazy:
```
cd Diploma-Thesis
npm install
cd frontend
npm install
```
Týmto krokom nainštalujeme príslušné balíčky, ktoré sa uložia do novovytvorených priečinkov *node_modules*. <br/>
Ďalej treba v hlavnom priečinku *Diploma-Thesis* vytvoriť súbor **.env** a vložiť doňho nasledujúce systémové premenné:
```
PORT = 5000
NODE_ENV = development
MONGO_URI = mongodb+srv://<DB-NAME>:<DB-PASSWORD>@supplydemandsystem.auf7o.mongodb.net/dp-database?retryWrites=true&w=majority
JWT_SECRET = hocijaky_retazec123
```
Po úspešnom zvládnutí týchto krokov môžeme z hlavného priečinku spustiť
- celú aplikáciu príkazom `npm run dev`,
- klientskú časť príkazom `npm run client`, 
- serverovú časť príkazom `npm run server`. 
