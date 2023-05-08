const showSucess = (response, res) => {
    let message = response.message ? response.message : "success";
    let status = response.status ? response.status : "200";
    let data = response.data ? response.data : {};
  
    response = {
      message,
      status,
      data,
    };
  
    return res.send(response);
  };
  
  const showError = (response, res) => {
    console.log("errrrf", response);
    let message = response.message ? response.message : "Error";
    let status = response.status ? response.status : "400";
    let data = response.data ? response.data : {};
  
    response = {
      message,
      status,
      data,
    };
  
    return res.send(response);
  };


  module.exports = { showSucess, showError };
