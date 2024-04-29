
function addZero(time) {
    if(time < 10) return `0${time}`;
    return time;
}

const date = new Date();
let hour = date.getHours();
    hour = addZero(hour);
    let minute = date.getMinutes();
    minute = addZero(minute);
    let second = date.getSeconds();
    second = addZero(second);

    const saleTime = `${hour}:${minute}:${second}`;
console.log(saleTime)