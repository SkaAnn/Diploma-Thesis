export const categoryOptions = [
    { label: 'Oblečenie a obuv', value: 1 },
    { label: 'Hračky a hry', value: 2 },
    { label: 'Knihy', value: 3 },
    { label: 'Nábytok a bývanie', value: 4 },
    { label: 'Starožitnosti a zberateľstvo', value: 5 },
    { label: 'Starostlivosť o zvieratá', value: 6 },
    { label: 'Šport', value: 7 },
    { label: 'Hudba', value: 8 },
    { label: 'Dom a záhrada', value: 9 },
    { label: 'Zdravie', value: 10 },
    { label: 'Šperky a dekorácie', value: 11 },
    { label: 'Mobily a tablety', value: 12 },
    { label: 'Počítače a TV', value: 13 },
    { label: 'Elektro', value: 14 },
    { label: 'Ostatné', value: 15 },
].sort((a, b) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const nameA = a.label.toUpperCase(); 
    const nameB = b.label.toUpperCase(); 
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;   // names must be equal
})

export const hintOptions = [
'farba, materiál, konfekčná veľkosť', // Oblečenie a obuv
'materiál, vhodný pre vek', // Hračky a hry
'autor, počet strán, rok vydania',  // Knihy
'', // Nábytok a bývanie
'rok výroby', // Starožitnosti a zberateľstvo
'', // Starostlivosť o zvieratá
'použitie (vonku, dnu)', // Šport
'rok výroby, záruka', // Hudba
'', // Dom a záhrada
'účel použitia, záručná doba', // Zdravie
'', // Šperky a dekorácie
'príslušenstvo, veľkosť pamäte, kvalita fotoaparátu', // Mobily a tablety
'veľkosť pamäte', // Počítače a TV
'záruka', //Elektro
'' // Ostatné
]