const BASE_URL = 'http://51.77.105.23:81/';

export const womenListApi = async (accessToken, anganwadiId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", refreshToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/anganwadi/women/" + anganwadiId, requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const registrationWomenApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectUserBirthDate, selectUserCheckupDate, selectUserPregnancyDate, isAnganwadiId, isPregnancyNote, option, isFileData, image) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);

        var formdata = new FormData();
        formdata.append("FirstName", isFirstName);
        formdata.append("MiddleName", isMiddleName);
        formdata.append("LastName", isLastdName);
        formdata.append("Weight", isWeight);
        formdata.append("Height", isHeight);
        formdata.append("DateOfBirth", selectUserBirthDate);
        formdata.append("Image", isFileData, image);
        formdata.append("IsSpeciallyAbled", option);
        formdata.append("WomanCheckUpDetails.WomanId", "0");
        formdata.append("AnganwadiId", isAnganwadiId);
        formdata.append("WomanCheckUpDetails.DoctorId", "1");
        formdata.append("WomanCheckUpDetails.Weight", isWeight);
        formdata.append("WomanCheckUpDetails.PregnancyDate", selectUserPregnancyDate);
        formdata.append("WomanCheckUpDetails.PregnancyNotes", isPregnancyNote);
        formdata.append("WomanCheckUpDetails.CheckUpDate", selectUserCheckupDate);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/Woman/register", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getWomenDetailsApi = async (accessToken, womenId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/woman/" + womenId, requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const updateWomenProfileApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, isAnganwadiId, option, isWomenId, isActive, selectUserBirthDate, isFileData, image) => {
    try {
        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", isAccessToken);
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "WomanId": isWomenId,
        //     "firstName": isFirstName,
        //     "middleName": isMiddleName,
        //     "lastName": isLastdName,
        //     "weight": isWeight,
        //     "height": isHeight,
        //     "dateOfBirth": selectedDate,
        //     "imageUrl": "string",
        //     "isSpeciallyAbled": option,
        //     "anganwadiId": isAnganwadiId,
        //     "isActive": isActive
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);

        var formdata = new FormData();
        formdata.append("FirstName", isFirstName);
        formdata.append("MiddleName", isMiddleName);
        formdata.append("LastName", isLastdName);
        formdata.append("Weight", isWeight);
        formdata.append("Height", isHeight);
        formdata.append("DateOfBirth", selectUserBirthDate);
        formdata.append("Image", isFileData, image);
        formdata.append("IsSpeciallyAbled", option);
        formdata.append("AnganwadiId", isAnganwadiId);
        formdata.append("WomanId", isWomenId);
        formdata.append("IsActive", isActive);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/woman/update", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getDoctorListApi = async (accessToken) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/doctor", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const addWomenCheckupApi = async (isAccessToken, isWomenId, isValueDocterName, isPregnancyDate, isWeight, isPregnancyNote, isPregnancySymptoms, isMedicalHistory, date, isPrescription) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "womanId": isWomenId,
            "doctorId": isValueDocterName,
            "weight": isWeight,
            "pregnancyDate": isPregnancyDate,
            "pregnancyNotes": isPregnancyNote,
            "medicalHistory": isMedicalHistory,
            "prePregnancyNotes": isPregnancySymptoms,
            "checkUpDate": date,
            "prescription": isPrescription
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/woman/addcheckup", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const registrationChildApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, isAnganwadiId, option, isCheckupNote, isPrescription, date, optionGender, selectUserBirthDate, image, isFileData) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);

        var formdata = new FormData();
        formdata.append("FirstName", isFirstName);
        formdata.append("MiddleName", isMiddleName);
        formdata.append("LastName", isLastdName);
        formdata.append("Weight", isWeight);
        formdata.append("Height", isHeight);
        formdata.append("DateOfBirth", selectUserBirthDate);
        formdata.append("Image", isFileData, image);
        formdata.append("IsSpeciallyAbled", option);
        formdata.append("ChildCheckUpDetails.ChildId", "0");
        formdata.append("AnganwadiId", isAnganwadiId);
        formdata.append("ChildCheckUpDetails.DoctorId", "1");
        formdata.append("ChildCheckUpDetails.Weight", isWeight);
        formdata.append("ChildCheckUpDetails.Height", isHeight);
        formdata.append("ChildCheckUpDetails.CheckUpNotes", isCheckupNote);
        formdata.append("ChildCheckUpDetails.CheckUpDate", date);
        formdata.append("Gender", optionGender);
        formdata.append("ChildCheckUpDetails.Prescription", isPrescription);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/child/register", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const childListApi = async (accessToken, anganwadiId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/anganwadi/children/" + anganwadiId, requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getChildDetailsApi = async (accessToken, childId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/child/" + childId, requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const updateChildProfileApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectUserBirthDate, isFileData, image, option, isAnganwadiId, optionGender, isChildId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);

        var formdata = new FormData();
        formdata.append("FirstName", isFirstName);
        formdata.append("MiddleName", isMiddleName);
        formdata.append("LastName", isLastdName);
        formdata.append("Weight", isWeight);
        formdata.append("Height", isHeight);
        formdata.append("DateOfBirth", selectUserBirthDate);
        formdata.append("Image", isFileData, image);
        formdata.append("IsSpeciallyAbled", option);
        formdata.append("AnganwadiId", isAnganwadiId);
        formdata.append("Gender", optionGender);
        formdata.append("ChildId", isChildId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/Child/update", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const addChildCheckupApi = async (isAccessToken, isChildId, isValueDocterName, isWeight, isCheckUpNotes, date, isPrescription, isHeight) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "childId": isChildId,
            "doctorId": isValueDocterName,
            "weight": isWeight,
            "height": isHeight,
            "checkUpDate": date,
            "prescription": isPrescription,
            "checkUpNotes": isCheckUpNotes
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/child/addcheckup", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}