import axios from "axios";

async function fetchLastTrainTime(code, day, direction) {
    try {
        const apiUrl = `http://openAPI.seoul.go.kr:8088/786c75584f73756e3830505678584f/xml/SearchLastTrainTimeByIDService/1/5/${code}/${day}/${direction}/`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function getArrInfoByRouteAllList(busId) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAllList?busRouteId=${busId}&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getArrInfoByRouteList(busId, stId, ord) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteList?busRouteId=${busId}&stId=${stId}&ord=${ord}&&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}