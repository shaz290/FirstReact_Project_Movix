// api.js
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjhhMGM0N2U2YzUxZDM5OTk4ZDlkMTBiN2QxODYzNyIsInN1YiI6IjY1YzMyZDA1Y2I3NWQxMDE2MzZjM2U5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AG40d2EefjQcUfhApOmmGtT4AZcLvqojVYk1uzbQyVI";
const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        });
        return data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch data from API");
    }
};
