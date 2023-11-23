import axios from "axios";

export async function getAddress(query) {
    try {
        const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
            params: {
                query: query,
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': process.env.NAVERKEY,
                'X-NCP-APIGW-API-KEY': process.env.NAVERSECRETKEY,
            },
        });
        return { x: response.data.addresses[0].x, y: response.data.addresses[0].y };
    } catch (error) {
        console.log(error);
    }
}
export async function getAddressWithCoordinate(x, y) {
    const coordinate = String(x) + ',' + String(y);
    console.log(coordinate);
    try {
        const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
            params: {
                coords: coordinate,
                output: "json",
                orders: "roadaddr",
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': process.env.NAVERKEY,
                'X-NCP-APIGW-API-KEY': process.env.NAVERSECRETKEY,
                'Access-Control-Allow-Origin': "*"
            },
        });
        const addressData = response.data.results[0];
        if (addressData.land && addressData.land.number2) {
            const modifiedAddress = `${addressData.region.area1.name} ${addressData.region.area2.name} ${addressData.region.area3.name} ${addressData.land.name}${addressData.land.number1}-${addressData.land.number2}`;
            return modifiedAddress;
        } else {
            return `${addressData.region.area1.name} ${addressData.region.area2.name} ${addressData.region.area3.name} ${addressData.land.name}${addressData.land.number1}`;
        }

    } catch (error) {
        console.log(error);
    }
}
