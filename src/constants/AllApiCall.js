const BASE_URL = 'https://demo.crayoninfotech.com/newcagr/v2-api/';

export const OccupationApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/arroccupation", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}