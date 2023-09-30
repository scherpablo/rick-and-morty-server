const users = require('../utils/users');

const login = (req, res) => {
    const { email, password } = req.query;
    let access = false; 

    if (email && password) {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) access = true;
    }
    return res.json({ access })
}

module.exports = login

// const users = require('../utils/users');

// const login = (req, res) => {
//     const { email, password } = req.query;
//     let access = false; 

//     if (email && password) {
//         const user = users.find(user => user.email === email && user.password === password);
//         if (user) {
//             return res.status(200).json({
//                 access: true,
//             });
//         }else {
//             return res.status(401).json({
//                 access: false,
//             });
//         }
//     }
// }

// module.exports = login

// users.forEach((user) => {
//     if (user.email === email && user.password === password) {
//         access = true;
//     }
//     return res.json({access})
// })