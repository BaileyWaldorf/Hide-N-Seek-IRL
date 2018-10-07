function randomid(){
  var charset = [66,67,68,70,71,72,74,75,76,77,78,80,81,82,83,84,86,87,88,89,90,98,99,100,101,102,103,104,106,107,108,109,110,112,113,114,115,116,118,119,120,121,122];



  var rand1 = charset[Math.floor(Math.random() * charset.length)]
  var rand2 = charset[Math.floor(Math.random() * charset.length)]
  var rand3 = charset[Math.floor(Math.random() * charset.length)]
  var rand4 = charset[Math.floor(Math.random() * charset.length)]

  console.log(String.fromCharCode(rand1, rand2, rand3, rand4));
}
