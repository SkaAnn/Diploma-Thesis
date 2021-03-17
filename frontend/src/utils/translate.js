import { categoryOptions } from './options'

export const triangleColor = (condition) => {
    switch (condition) {
        case "new":
            return 'pink'
        case "used":
            return 'blue'
        case "handmade":
            return 'yellow'
        default:
            return 'gray'
    }
}

export const translateClassification = (classification) => {
    switch (classification) {
        case 'supply':
            return 'ponuka'
        case 'demand':
            return 'dopyt'
        case 'donor':
            return 'darujem'
        default:
            return ''
    }
}

export const getCategoryName = (val) => {
    let name = ''
    categoryOptions.map((opt) => (
        val === opt.value && (name = opt.label)
    ))
    return name
}

export const translateCondition = (condition) => {
    switch (condition) {
        case "new":
            return 'NOVÝ TOVAR'
        case "used":
            return 'POUŽITÝ TOVAR'
        case "handmade":
            return 'VLASTNÁ VÝROBA' // RUČNÁ
        default:
            return ''
    }
}