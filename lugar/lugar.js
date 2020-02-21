const axios = require('axios');

const getLugarLatLng = async (direccion) => {
    const encodedURL = encodeURIComponent(direccion);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
        headers: {'x-rapidapi-key': '0d2e852213msh5bb5a0c541c339bp13e713jsn4d2f3d832b41'}
    });

    const resp = await instance.get();
    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.Results[0];
    const name = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        name,
        lat,
        lng
    };
};

module.exports = {
    getLugarLatLng
};