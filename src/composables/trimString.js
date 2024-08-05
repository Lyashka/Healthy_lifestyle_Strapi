export default function trimString(value) {
  const cleanedStr = value.replace(',', '.').replace(/\s/g, '') 
  return parseFloat(cleanedStr)   
}