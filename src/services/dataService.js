import axios from "axios";
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
export async function getArrInfoByRouteAllList(busRouteId) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAllList?busRouteId=${busRouteId}&ServiceKey=RQslpW3crnupMLfXthBhAWMS9OgFxhDVVhDdI24P5cZ5%2FpiUTCMDOkDMmLfLGLAt%2BvP5sZezXgtCMhv1M5vuYg%3D%3D`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getArrInfoByRouteList(busId, stId, ord) {
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteList?busRouteId=${busId}&stId=${stId}&ord=${ord}&ServiceKey=RQslpW3crnupMLfXthBhAWMS9OgFxhDVVhDdI24P5cZ5%2FpiUTCMDOkDMmLfLGLAt%2BvP5sZezXgtCMhv1M5vuYg%3D%3D`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getBustimeByStationList(arsId, busRouteId ){ // 막차 시간 계산
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/stationinfo/getBustimeByStation?arsId=${arsId}&busRouteId=${busRouteId}&ServiceKey=RQslpW3crnupMLfXthBhAWMS9OgFxhDVVhDdI24P5cZ5%2FpiUTCMDOkDMmLfLGLAt%2BvP5sZezXgtCMhv1M5vuYg%3D%3D`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getStaionsByPosList(tmX, tmY, radius) {// 근접 정류소 정보 목록 조회
    try {
        const apiUrl = `http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos?tmX=${tmX}&tmY=${tmY}&radius=${radius}&ServiceKey=RQslpW3crnupMLfXthBhAWMS9OgFxhDVVhDdI24P5cZ5%2FpiUTCMDOkDMmLfLGLAt%2BvP5sZezXgtCMhv1M5vuYg%3D%3D`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
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

