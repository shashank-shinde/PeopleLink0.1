
async function birthdayWishSend(user, emp) {
    const payload = {
        birthdayDetails:
        {
            LoginEmpID: user.LoginEmpID,
            LoginEmpCompanyCodeNo: user.LoginEmpCompanyCodeNo,
            EmpName: emp.EmpName,
            EmailId: emp.EmailId,
            EmpId: emp.EmpId
        }
    };

    const formBody = JSON.stringify(payload, (kay, value) => {
        if (value !== null) {
            return value;
        }
        return {};
    });

    const response = await fetch(`${user.baseUrl}/Dashboard/sendBirthDayWish`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formBody,
    });

    const responseJson = await response.json();
    return responseJson;
}

export { birthdayWishSend };
