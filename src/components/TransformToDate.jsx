const transformToDate = (date) => {
    const heures = (heureMinuteSeconde) => {
        if(date[heureMinuteSeconde] <= 10) {
            return "0" + date[3];
        } else {
        return date[heureMinuteSeconde];
        }
    }

    const dateValues = "le " + date[2] + "/" + date[1] + "/" + date[0] + " à " + heures(3) + ":" + heures(4) + ":" + heures(5)

    return dateValues;
}

export default transformToDate;