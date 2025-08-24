import { useState, useEffect } from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import MicroentrepreneurshipCard from "../reusable-components/MicroentrepreneurshipCard";
import CircularProgress from "@mui/material/CircularProgress";
import apiClient from "../../scripts/axiosConfig";

interface Microemprendimiento {
  id: number;
  nombre: string;
  subcategoria: string;
  categoria: { nombre: string };
  ciudad: string;
  provincia: string;
  pais: string;
  descripcion: string;
  masInformacion: string;
  imagenes: { url: string }[];
  distance: number;
}

const GeoMicroResults = () => {
  const [geoMicroentrepreneurships, setGeoMicroentrepreneurships] = useState<
    Microemprendimiento[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          apiClient.get(`https://ubuntu.koyeb.app/micro/api/near?lat=${lat}&lon=${lon}`)
            .then((response) => {
              const data = response.data;
              const filteredData = data.filter((micro: Microemprendimiento) => micro.distance < 500);
              setGeoMicroentrepreneurships(filteredData);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error:", error);
              setIsLoading(false);
            });
        },
        (error) => {
          console.error("Error obteniendo la geolocalización:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocalización no está soportada por este navegador.");
    }
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  return (
    <div
      className="searchBarResultsPage-body"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <div
        className="searchResults-container"
        style={{
          position: "relative",
          top: "24px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Microemprendimientos Cercanos</h2>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "192px",
            }}
          >
            <CircularProgress style={{ color: "#59BA47" }} />
          </div>
        ) : (
          <section style={{ width: "100%" }}>
            {geoMicroentrepreneurships.length === 0 ? (
              <div className="con-id-negativo">
                <article
                  style={{
                    minHeight: "192px",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "328px",
                    justifyContent: "center",
                    backgroundColor: "var(--grisClaro)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <SearchOffIcon
                    style={{
                      fill: "var(--azul)",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "25px",
                      color: "var(--azul)",
                    }}
                  >
                    No se encontraron resultados para tu búsqueda
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "var(--negro)",
                    }}
                  >
                    Intentá nuevamente con otra consulta
                  </p>
                </article>
              </div>
            ) : (
              <div className="sin-id-negativo">
                {geoMicroentrepreneurships.map((micro) => (
                  <MicroentrepreneurshipCard
                    key={micro.id}
                    id={micro.id}
                    nombre={micro.nombre}
                    subcategoria={micro.subcategoria}
                    categoria={micro.categoria.nombre}
                    ciudad={micro.ciudad}
                    provincia={micro.provincia}
                    pais={micro.pais}
                    descripcion={micro.descripcion}
                    masInformacion={micro.masInformacion}
                    imagenes={micro.imagenes}
                    mensajeDeContacto={""}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default GeoMicroResults;
