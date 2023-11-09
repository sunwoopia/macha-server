import axios from "axios";

// code: 역 코드
// day: 평일, 주말
// direction: 방향이 어디인지
export async function fetchLastTrainTime(code, day, direction) {
    try {
        const apiUrl = `http://openAPI.seoul.go.kr:8088/786c75584f73756e3830505678584f/xml/SearchLastTrainTimeByIDService/1/5/${code}/${day}/${direction}/`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export async function getArrInfoByRouteAllList(busId) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAllList?busRouteId=${busId}&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getArrInfoByRouteList(buId, stId, ord) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteList?busRouteId=${busId}&stId=${stId}&ord=${ord}&&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getBustimeByStationList(arsId, busRouteId ){ // 막차 시간 계산 
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/stationinfo/getBustimeByStation?arsId=${arsId}&busRouteId=${busRouteId}&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}