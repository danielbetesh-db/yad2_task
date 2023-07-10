import { useState } from "react";
import { Button, LocationButton } from "../components/page";
import { useNavigate } from "react-router-dom";

export function Home(props: {}) {
  const [state, setState] = useState<{
    firstUse: boolean;
    latitude: number;
    longitude: number;
    errorMessage?: string;
  }>({
    firstUse: false,
    latitude: 0,
    longitude: 0,
    errorMessage: "",
  });

  const nav = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <LocationButton
            onClick={(latitude, longitude, error) => {
              setState((state) => ({
                ...state,
                latitude,
                longitude,
                errorMessage: error,
                firstUse: true,
              }));
            }}
          />
          {state.firstUse && !state.errorMessage ? (
            <Button
              onClick={async () => {
                nav(
                  `/attractions/lat/${state.latitude}/long/${state.longitude}`
                );
              }}
            >
              Find Attractions
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      );
      {state.firstUse ? (
        state.errorMessage ? (
          <div style={{ color: "red" }}>{state.errorMessage}</div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>Latitude: </span>
              <span>{state.latitude}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Longitude: </span>
              <span>{state.longitude}</span>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
