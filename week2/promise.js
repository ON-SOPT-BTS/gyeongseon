const getNumber = new Promise((res, rej) => {
    console.log('getNumber Pending')
    setTimeout(() => {
        res(100);
    }, 1000);
})


getNumber
.then(v => {
    console.log(v)
    return v * 2
})
.then(v => {
    console.log(v)
    return v * 3
})
.then(v => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(v+1000);
        }, 1000);
    })
    
})
.then(console.log)