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