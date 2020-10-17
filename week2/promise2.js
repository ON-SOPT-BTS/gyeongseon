// 중학교 -> 고등학교 -> 대학교
const is_out = true;
const middleSchool = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(`중학교`);
    }, 1000)
});

const highSchool = school => new Promise((res, rej) => {
    if (is_out) {
        setTimeout(() => {
            rej(new Error('에러!'));
        }, 1000)
    } else {
        setTimeout(() => {
            res(`${school} => 고등학교`);
        }, 1000)
    }
})

const univ = school => new Promise((res, rej) => {
    setTimeout(() => {
        res(`${school} => 대학교`);
    }, 1000)
})

middleSchool() //
    .then(school => highSchool(school))
    .catch(err => {
        return `검정고시`;
    })
    .then(school => univ(school))
    .then(result => console.log(result))
    .catch(error => console.error(error));