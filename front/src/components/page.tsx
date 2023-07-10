import { useCallback } from "react";

export function LocationButton(props: {
  onClick: (latitude: number, longitude: number, error?: string) => void;
}) {
  const { onClick } = props;
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      onClick(0, 0, "Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onClick(position.coords.latitude, position.coords.longitude);
        },
        () => {
          onClick(0, 0, "Unable to retrieve your location");
        }
      );
    }
  }, [onClick]);

  return (
    <div>
      <Button onClick={getLocation}>הצג מיקום</Button>
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
