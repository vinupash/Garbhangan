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

export const registrationWomenApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, selectedCheckupDate, selectedPregnancyDate, isAnganwadiId, isPregnancySymptoms, isMedicalHistory, isPregnancyNote, option) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "firstName": isFirstName,
            "middleName": isMiddleName,
            "lastName": isLastdName,
            "weight": isWeight,
            "height": isHeight,
            "dateOfBirth": selectedDate,
            "imageUrl": 'image',
            "isSpeciallyAbled": option,
            "anganwadiId": isAnganwadiId,
            "womanCheckUpDetails": {
                "doctorId": 1,
                "weight": isWeight,
                "pregnancyDate": selectedPregnancyDate,
                "pregnancyNotes": isPregnancySymptoms,
                "medicalHistory": isMedicalHistory,
                "prePregnancyNotes": isPregnancySymptoms,
                "checkUpDate": selectedCheckupDate,
                "prescription": isPregnancyNote
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/woman/register", requestOptions);
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

export const updateWomenProfileApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, isAnganwadiId, option, isWomenId, isActive) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "WomanId": isWomenId,
            "firstName": isFirstName,
            "middleName": isMiddleName,
            "lastName": isLastdName,
            "weight": isWeight,
            "height": isHeight,
            "dateOfBirth": selectedDate,
            "imageUrl": "string",
            "isSpeciallyAbled": option,
            "anganwadiId": isAnganwadiId,
            "isActive": isActive
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
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

export const registrationChildApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, isAnganwadiId, option, isCheckupNote, isPrescription, date, optionGender) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "firstName": isFirstName,
            "middleName": isMiddleName,
            "lastName": isLastdName,
            "gender": optionGender,
            "dateOfBirth": selectedDate,
            "imageUrl": "image",
            "isSpeciallyAbled": option,
            "anganwadiId": isAnganwadiId,
            "childCheckUpDetails": {
                "doctorId": 1,
                "weight": isWeight,
                "height": isHeight,
                "checkUpNotes": isCheckupNote,
                "checkUpDate": date,
                "prescription": isPrescription
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
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
        // myHeaders.append("Cookie", refreshToken);

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

export const updateChildProfileApi = async (isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, isAnganwadiId, option, optionGender, isChildId, isActive) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", isAccessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ChildId": isChildId,
            "firstName": isFirstName,
            "middleName": isMiddleName,
            "lastName": isLastdName,
            "gender": optionGender,
            "dateOfBirth": selectedDate,
            "imageUrl": "image",
            "isSpeciallyAbled": option,
            "anganwadiId": isAnganwadiId,
            "isActive": isActive
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/woman/update", requestOptions);
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