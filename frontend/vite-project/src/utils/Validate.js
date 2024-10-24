export const ValidateLogin = (obj) => {
    console.log(obj)
    let error = {}
    if(!obj.email) {
        error.email = "enter email"
    }
    if(!obj.password) {
        error.password= "enter password"
    }

    if(Object.keys(error).length>0) {
        error.isValid = true
    }
    return error
}
