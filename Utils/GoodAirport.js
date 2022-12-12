module.exports = airport => {
    if(!airport || airport == "") return false;
    const sep = airport.trim().split(" ")
    if(sep.length != 2) return false;
    return (sep[1].length != 5 || !sep[1].startsWith("(") || sep[1].endsWith(")")) 
}