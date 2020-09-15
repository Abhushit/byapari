const passwordHash = require('password-hash');

module.exports = function (user, userDetails) {
    if (userDetails.name)
        user.name = userDetails.name;
    if (userDetails.email)
        user.email = userDetails.email;
    if (userDetails.username)
        user.username = userDetails.username;
    if (userDetails.password)
        user.password = passwordHash.generate(userDetails.password);
    if (userDetails.date_of_birth)
        user.dob = userDetails.date_of_birth;
    if (userDetails.gender)
        user.gender = userDetails.gender;
    if (userDetails.role)
        user.role = userDetails.role;
    if (userDetails.status)
        user.status = userDetails.status;
    if (userDetails.phone)
        user.phoneNumber = userDetails.phone;
    if (userDetails.temporary_addr || userDetails.permanent_addr) {
        if (!user.address) {
            user.address = {};
        }
        if (userDetails.temporary_addr)
            user.address.temporary_addr = userDetails.temporary_addr.split(',');

        if (userDetails.permanent_addr)
            user.address.permanent_addr = userDetails.permanent_addr

    }
    return user;

}
