try {
    const fs = require('fs')
    const sha1 = require('sha1')

    function addUser() {
        var name = document.getElementById('name').value
        var email = document.getElementById('email').value
        var password = sha1(document.getElementById('password').value)
        var cpassword = sha1(document.getElementById('cpassword').value)

        if (password == cpassword) {
            fs.readFile('./ressources/auth/users.json', function (err, data) {
                if (err) throw err
                else {
                    const file = JSON.parse(data)
                    
                    var result = file.users.filter(usr => {
                        return usr.password === password && usr.email === email
                    })
                    
                    const user_push = {
                        "id": file.users.length + 1,
                        "name": name,
                        "email":  email,
                        "password": password
                    }
                    
                    if (result == user_push) {
                        console.log('user already exist')
                    }
                    else {
                        file.users.push(user_push)
                        
                        const json = JSON.stringify(file, null, "\t")
                        
                        fs.writeFile('./ressources/auth/users.json', json, function (err) {
                            if (err) throw err
                        })
                        
                        console.log('user is added')
                    }
                }
            })
        }
    }
    function connect() {
        var email = document.getElementById('email').value
        var password = sha1(document.getElementById('password').value)

        fs.readFile('./ressources/auth/users.json', function(err, data) {
            if (err) throw err
            else {
                const file = JSON.parse(data)

                var result = file.users.filter(usr => {
                    return usr.password === password && usr.email === email
                })

                let emptyArray = result.length

                if (emptyArray === 0) {
                    console.log("user not found");
                }
                else {
                    console.log("user conncted");
                    sessionStorage.setItem('user-state', 'connected')
                }

            }
        })
    }
}
catch (err) {
    console.log(err);
}