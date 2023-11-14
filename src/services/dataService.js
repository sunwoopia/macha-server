import axios from "axios";
const serviceKey = 'w8c+i8IxhUxkWN9tRre/aI/saBtqwIKe7zEjK+jhcvf/KivE8+RkxWsIn5FaS1pHdQNSLoxd5z8ISoncJddfPw==';
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

export async function getArrInfoByRouteList(busId, stId, ord) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteList?busRouteId=${busId}&stId=${stId}&ord=${ord}&&ServiceKey=${process.env.SERVICEKEY}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getBusInfo(arsId) {
    try {
        let url = 'http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation'; /*URL*/
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ process.env.SERVICEKEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('stSrch') + '=' + encodeURIComponent('12121'); /**/
        // const apiUrl = `http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?ServiceKey=${process.env.SERVICEKEY}&arsId=${arsId}&resultType=json`
        // console.log(apiUrl);
        const response = await axios.get(url + queryParams);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

