function randomid(){
  var charset = "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz";
  var length = 4;
  randstring = '';

  for (var i = 0, i < length, i++){
    randstring += charset(Math.floor(Math.random() * charset.length))

  }
}
