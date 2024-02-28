export function timeString(time: number, abr: boolean) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = ((time % 3600) % 60);

    const hourStr = hours ? `${hours} час${hours % 10 !== 1 ? 'ов' : ''}` : '';
    const minuteStr = minutes ? `${minutes} минут${minutes % 10 === 1 ? 'у' : ''}` : '';
    const secondStr = seconds ? `${seconds} секунд${seconds % 10 === 1 ? 'у' : ''}` : '';

    switch (abr) {
        case false:
            if (seconds > 3599) return (`${hourStr} ${minuteStr}`);
            if (seconds <= 3599) return (`${minuteStr} ${secondStr}`);

            return '';

        case true:
            if (time > 3599) return (`${hours ? hours + ' ч ' : ''}${minutes ? minutes + ' мин' : ''}`);
            if (time <= 3599) return (`${minutes ? minutes + ' мин ' : ''}${seconds ? seconds + ' сек' : ''}`);

        return '';
        default:
            return '';
    }
}