
export default function ageConverter (strDate: string): number {

    const birth_date = Date.parse(strDate)
    const nowDate = new Date().getTime()
    const age = (nowDate - birth_date) / 31557600000
    return Math.floor(age)
    

}