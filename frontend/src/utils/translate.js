export const translateCondition = (condition) => {
    switch (condition) {
        case "new":
            return 'NOVÝ TOVAR'
        case "used":
            return 'POUŽITÝ TOVAR'
        case "handmade":
            return 'VLASTNÁ VÝROBA' // RUČNÁ
        default:
            return ""
    }
}

export const translateClassification = (classification) => {
    switch (classification) {
        case 'supply':
            return 'PONUKA'
        case 'demand':
            return 'DOPYT'
        case 'donor':
            return 'DARUJEM'
        default:
            return ''
    }
}
