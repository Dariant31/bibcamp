export class GeneralUtils {
    static get randomLoadingTime(): number {
        const max = 1700;
        const min = 700;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
