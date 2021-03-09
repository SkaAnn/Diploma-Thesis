import bcrypt from 'bcryptjs'

// Restrictions for values
// profileType: user, company

const users = [
    {
        name: 'Anna',
        email: 'anna@example.com',
        password: bcrypt.hashSync('123', 10),
        phoneNumber: '900111222',
        profileImage: '/images/sample-profile.svg',
        profileType: 'user',
        locality: 'Bratislava, Slovenská republika',
        profileInfo: '',
        marketPolicy: '', 
        favoriteProducts: []
    },
    {
        name: 'TestCompany',
        email: 'testCompany@example.com',
        password: bcrypt.hashSync('123', 10),
        phoneNumber: '911222333',
        profileImage: '/images/sample-profile.svg',
        profileType: 'company',
        locality: 'Viedeň, Rakúsko',
        profileInfo: 'Sme skvelá firma ktorá predáva len tie najlepšie produkty. Založený sme boli 01.01.2021 kvôli účelom tejto diplomovej práce. Vitajte v našom obchode!',
        marketPolicy: 'V Rakúsku a okolí Bratislavy je rozvoz zdarma. Ďalej +0.10e za každých 10km. Každý piatok zľava 20% na určitý tovar.', 
        favoriteProducts: []
    },
    {
        name: 'user123',
        email: 'user123@example.com',
        password: bcrypt.hashSync('123', 10),
        phoneNumber: '922333444',
        profileImage: '/images/sample-profile.svg',
        profileType: 'user',
        locality: 'Uganda, Afrika',
        profileInfo: '',
        marketPolicy: 'Dovážame tovar len raz mesačne podľa aktuálnej situácie. Poštovné +10e', 
        favoriteProducts: []
    },
]

export default users

// JSON
// {
//     "name": "Anna",
//     "email": "anna@example.com",
//     "password": "123",
//     "phoneNumber": "0901123456",
//     "profileImage": "/images/sample-profile.svg",
//     "profileType": "user",
//     "locality": "Bratislava, Slovenská republika",
//     "profileInfo": "",
//     "marketPolicy": "",
//     "favoriteProducts": []
// }