export default function (body){
  return new Promise((resolve, reject)=>{
        try {
            window.mcefQuery({
              request: body,
              persistent: true,
              onSuccess: function (response){

                  //let data = JSON.parse(response).data;

                  resolve( JSON.parse(response) );
              },
              onFailure: function(errCode, errMsg) {
                          reject( JSON.parse(errMsg) )
                        }
              })

        } 
        catch (err) {
            reject(JSON.parse(err));
        }

  })
}

/**
 * USAGE
 */
/*
function attach (){

  let data = {
        "data": "itp slot 0 mcap_serg coords 636 69 -554",
        "action": "executeCMD",
        "uuid": uid(),
        "type": "server",
        "dts": getTime(),
        "ars": true,
        "player": $playerName
  }
  let str = `CMD_${JSON.stringify(data)}`;

  mcefQuery(str)
    .then(res=>alert(JSON.stringify(res)))
    .catch(err=>alert(JSON.stringify(err)))
 // return  query(str);
}






 */