import { useCallback } from "react";

export function LocationButton(props: {
  onClick: (latitude: number, longitude: number, error?: string) => void;
}) {
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      props.onClick(0, 0, "Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          props.onClick(position.coords.latitude, position.coords.longitude);
        },
        () => {
          props.onClick(0, 0, "Unable to retrieve your location");
        }
      );
    }
  }, []);

  return (
    <div>
      <Button onClick={getLocation}>Get Location</Button>
    </div>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button
      style={{ width: "150px", padding: "5px 0", borderRadius: "10px" }}
      {...rest}
    >
      {children}
    </button>
  );
}
