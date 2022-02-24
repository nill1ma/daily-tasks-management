const hasElementInArray = <T>(list: T[]): boolean => {
    const a = list && list.length > 0
    console.log(`result: `, a)
    return a
}


export {
    hasElementInArray
}