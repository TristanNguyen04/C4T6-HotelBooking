import "../styles/map.css";
type positionParam = {
    position: {
        lat: number;
        lng: number;
    };
};
export default function GoogleMapPage({ position }: positionParam): import("react/jsx-runtime").JSX.Element;
export {};
