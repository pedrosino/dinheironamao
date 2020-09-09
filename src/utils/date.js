// From https://stackoverflow.com/a/54754427

function getCurrentDate(separator=''){

  let newDate = new Date()
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${day<10?`0${day}`:`${day}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

export default getCurrentDate;