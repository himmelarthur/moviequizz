export const pick = <T extends {}>(arr: Array<T>) => {
    return arr[Math.floor(Math.random() * arr.length)]
}