export const load = <T extends {}>(key: string): T | undefined => {
    try {
        const encoded = localStorage.getItem(key)
        if (encoded === null) return;
        return JSON.parse(atob(encoded))
    } catch (err) {
        console.error(`Cannot load ${key}`, err);
        return undefined
    }
}

export const save = (key: string, obj: {}) => {
    localStorage.setItem(key, btoa(unescape(encodeURIComponent(JSON.stringify(obj)))))
}