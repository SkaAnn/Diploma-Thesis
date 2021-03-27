import { categoryOptions } from './options'

export const triangleColor = (condition) => {
    switch (condition) {
        case "new":
            return 'green'
        case "used":
            return 'blue'
        case "handmade":
            return 'orange'
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
            return 'nový'
        case "used":
            return 'používané'
        case "handmade":
            return 'vlastná výroba' // RUČNÁ
        default:
            return ''
    }
}