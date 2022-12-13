module.exports = airport => {
    if(!airport || airport == "") return false;
    const sep = airport.trim().split(" ")
    return (sep[sep.length - 1].length != 5 || !sep[sep.length - 1].startsWith("(") || sep[sep.length - 1].endsWith(")")) 
}