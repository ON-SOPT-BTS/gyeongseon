const express = require('express');
const router = express.Router();
const hash = require('../../modules/hash');
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode.js');
const usersDB = require('../../modules/users');

router.post('/signup', async (req, res) => {
    // 1. req.body에서 데이터 가져오기
    const { id, password } = req.body;
    console.log('usersDB : ', usersDB)

    //2. request data 확인하기, id 또는 password data가 없다면 NullValue 반환
    if (!id || !password)
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

    //3. 존재하는 아이디인지 확인하기. 이미 존재하는 아이디면 ALREADY ID 반환
    const exist = await usersDB.filter(u => u.id === id);
    if (exist.length !== 0)
        return res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.ALREADY_ID));

    //4. salt 생성
    //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) 해싱하여 => 암호화된 password 를 만들기!
    const { salt, hashed } = await hash.encrypt(password);
    
    //6. usersDB에 id, 암호화된 password, salt 저장!
    await usersDB.push({id, password:hashed, salt});

    //7. status: 200 message: SING_UP_SUCCESS, data: id만 반환! (비밀번호, salt 반환 금지!!)
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SING_UP_SUCCESS, {
            id: id
        }));
})

router.post('/signin', async (req, res) => {
    // 1. req.body에서 데이터 가져오기
    const { id, password } = req.body; 

    //2. request data 확인하기, id 또는 password data가 없다면 NullValue 반환
    if (!id || !password)
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            console.log('usersDB : ', usersDB)
    //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
    const exist = await usersDB.filter(u => u.id === id);
    console.log('exist : ', exist)
    if (exist.length === 0)
        return res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_USER));

    //4. 비밀번호 확인하기 - 로그인할 id의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와
    // 암호화를 한후 디비에 저장되어있는 password와 일치하면 true일치하지 않으면 Miss Match password 반환
    const hashed = await hash.encryptWithSalt(password, exist[0].salt);
    console.log('hashed : ', hashed)
    console.log('exist[0] : ', exist[0])
    if (hashed !== exist[0].password) 
        return res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));

    //5. status: 200 ,message: SIGNIN SUCCESS, data: id 반환 (비밀번호, salt 반환 금지!!)
    return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.SING_IN_SUCCESS, {
        id: id
    }));
})

router.get('/', (req, res) => {
    // 1.모든 유저정보 조회 (id, password, salt)!
    return res.status(statusCode.OK).send(util.success(statusCode.OK, '', { usersDB}));
})
module.exports = router;