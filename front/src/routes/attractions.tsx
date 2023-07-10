import { useMatch } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { ResponseRecord } from "../types/types";
import Cookies from "js-cookie";

const CookieKey = "favorites";

export default function Attractions(props: {}) {
  const match = useMatch("/attractions/lat/:lat/long/:long");

  if (!match?.params || !match?.params.long || !match?.params.lat) {
    throw new Error("Bad request");
  }
  const [state, setState] = useState<{
    records: (ResponseRecord & { km: number })[];
    error: string;
  }>({
    records: [],
    error: "",
  });

  const [favoritesIds, setFavorites] = useState<string[]>([]);
  const { lat, long } = match?.params;

  const toggleFavorite = useCallback(
    (id: string) => {
      const nextState = favoritesIds.includes(id)
        ? favoritesIds?.filter((f) => f !== id)
        : [...favoritesIds, id];
      setFavorites([...nextState]);
      const json = JSON.stringify({ favoritesIds: [...nextState] });

      Cookies.set(CookieKey, json);
    },
    [favoritesIds]
  );

  useEffect(() => {
    const cookie = Cookies.get(CookieKey);
    if (cookie) {
      try {
        const res = JSON.parse(cookie);
        setFavorites([...res?.favoritesIds]);
      } catch (e) {
        console.log(e);
      }
    }
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        const records = response.data?.result?.records as ResponseRecord[];
        setState((state) => ({
          ...state,
          records: records
            .map((rc) => ({
              ...rc,
              km: getDistanceInKm(Number(lat), Number(long), rc.Y, rc.X),
            }))
            .sort((a, b) => a.km - b.km),
          error: "",
        }));
      })
      .catch((err) => {
        setState((state) => ({ ...state, error: err }));
      });
  }, [lat, long]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Attractions</h1>
      <table border={1} style={{ direction: "rtl", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>שם האטרקציה</th>
            <th>מזהה</th>
            <th>כתובת</th>
            <th>שעות פתיחה</th>
            <th>מרחק</th>
            <th>לינק</th>
            <th>הוספה למועדפים</th>
          </tr>
        </thead>
        <tbody>
          {state.records.map((record) => {
            const id = `fav_${record.Id}`;
            return (
              <tr key={record.Id} style={{ fontSize: "14px" }}>
                <td className="p-4">{record.Name}</td>
                <td>{record.Id}</td>
                <td>{record.Address}</td>
                <td>{record.Opening_Hours}</td>
                <td>{`${record.km.toFixed()}km`}</td>
                <td>
                  <a target="_blank" href={record.Product_Url} rel="noreferrer">
                    לינק
                  </a>
                </td>
                <td>
                  <div
                    onClick={() => {
                      toggleFavorite(record.Id.toString());
                    }}
                  >
                    {favoritesIds.includes(record.Id.toString())
                      ? "Remove From Favorite"
                      : "Add To Favirite"}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
