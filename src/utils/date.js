// From https://stackoverflow.com/a/54754427

function getCurrentDate(separator=''){

  let newDate = new Date()
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${day<10?`0${day}`:`${day}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

function dateFormat(input, format) {
  let parts = input.split('-');
  
  return `${parts[2].split('T')[0]}/${parts[1]}${(format === 'long') ? `/${parts[0]}` : ''}`;
}

function dateSave(input, format) {
  let parts = input.split('/');
  
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export {
  getCurrentDate, 
  dateFormat,
  dateSave,
};