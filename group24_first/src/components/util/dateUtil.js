import moment from 'moment';

function formateDate(date){
    return moment(date).format('YYYY-MM-DD ddd');
}
function formateTime(date){
    return moment(date).format('hh:mm:ss a');
}
function relativeTime(date){
//like last sunday or last saturday
    return moment(date).calendar();
}


export default{
    formateDate,
    formateTime,
    relativeTime
}