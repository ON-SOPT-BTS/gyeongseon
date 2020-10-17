const members = require('./team.json')
members.forEach(m=>console.log(`이름: ${m.name}, 나이: ${m.age}, 주소: ${m.address}, 츼미: ${m.interest}, 정보: ${m.info}`))