const products = [
    {
        // user automatically
        name: 'Fén na vlasy',
        description:
            'Málo používaný fén na vlasy s 3-ma úrovňami rýchlostí. Vlasy vysuší rýchlo a šetrne. Je ekologický a kvalitný. Obsahuje aj ochranné púzdro a 2 druhy nadstavcov.',
        category: 14,
        price: 12.50,
        active: true,
        classification: 'supply',
        condition: 'used',
        countInStock: 1,
        origin: 'Čína',
        brand: 'Rowenta',
        images: [],
        size: 'cca 20cm',
        weight: '0.6 kg',
        followers: [],
        shipping: [
            { typ: 'Slovenská pošta', price: '4.5e' },
            { typ: 'Zásielkovňa', price: '2e' }
        ],
        moreProperties: [
            { key: 'farba', val: 'čierna'},
            { key: 'výkon', val: '1200W'},
            { key: 'materiál', val: 'plast'},
        ],
    },
]

export default products

// JSON
// {
//     "name": "Fén na vlasy",
//     "description": "Málo používaný fén na vlasy s 3-ma úrovňami rýchlostí. Vlasy vysuší rýchlo a šetrne. Je ekologický a kvalitný. Obsahuje aj ochranné púzdro a 2 druhy nadstavcov.",
//     "category": 14,
//     "price": 12.50,
//     "active": true,
//     "classification": "supply",
//     "condition": "used",
//     "countInStock": 1,
//     "origin": "Čína",
//     "brand": "Rowenta",
//     "images": [],
//     "size": "cca 20cm",
//     "weight": "0.6kg",
//     "followers": [],
//     "shipping": [
//         {
//             "typ": "Slovenská pošta",
//             "price": "4.5e"
//         },
//         {
//             "typ": "Zásielkovňa",
//             "price": "2e"
//         }
//     ],
//     "moreProperties": [
//         {
//             "key": "farba",
//             "val": "čierna"
//         },
//         {
//             "key": "výkon",
//             "val": "1200W"
//         },
//         {
//             "key": "materiál",
//             "val": "plast"
//         }
//     ]
// }