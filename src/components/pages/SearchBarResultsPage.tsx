import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../scripts/axiosConfig";
import SearchBar from "../visitors-components/SearchBar/SearchBar";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import MicroentrepreneurshipCard from "../reusable-components/MicroentrepreneurshipCard";
import CircularProgress from "@mui/material/CircularProgress";
import PublicationCard from "../visitors-components/PublicationCard";

interface Microemprendimiento {
  id: number
  nombre: string;
  subcategoria: string;
  categoria: { nombre: string };
  ciudad: string;
  provincia: string;
  pais: string;
  descripcion: string;
  masInformacion: string;
  imagenes: { url: string }[];
}

interface Publication {
  id: number;
  title: string;
  description: string;
  date: string;
  imagenes: PublicationImage[];
}

interface PublicationImage {
  url: string;
}

function SearchBarResultsPage({ type }: { type: 'microemprendimientos' | 'publicaciones' }) {
  const { result } = useParams();
  const [results, setResults] = useState<Array<Microemprendimiento | Publication> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchFetch = async () => {
      setIsLoading(true);
      try {
        let params = {};
        const endpoint = type === 'microemprendimientos' ? '/micro/find' : '/publications/search';

        if (type === 'microemprendimientos') {
          params = { name: result };
        } else {
          params = { publication: result };
        }

        const response = await apiClient.get(endpoint, { params });

        if (response.status === 200) {
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching:', type, error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (result) {
      searchFetch();
    }
  }, [result, type]);

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
      <SearchBar color="--grisClaro" position="relative" type={type} />
      <div
        className="searchResults-container"
        style={{
          position: "relative",
          top: "64px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Resultados de tu búsqueda{" "}
        </h2>
        <section
          className=""
          style={{
            width: "100%",
          }}
        >
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
          ) : results === null ||
            results.length === 0 ? (
            <div className="con-id-negativo">
              <article
                style={{
                  minHeight: "192px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: '328px',
                  justifyContent: "center",
                  backgroundColor: "var(--grisClaro)",
                  borderRadius: "8px",
                  textAlign: 'center'
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
              {type === 'microemprendimientos' ? (
                results.map((item, index) => {
                  const micro = item as Microemprendimiento;
                  return (
                    <MicroentrepreneurshipCard
                      key={index}
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
                      mensajeDeContacto={''}
                    />
                  );
                })
              ) : type === 'publicaciones' ? (
                results.map((item, index) => {
                  const publication = item as Publication;
                  return (
                    <PublicationCard
                      key={index}
                      id={publication.id}
                      title={publication.title}
                      description={publication.description}
                      date={publication.date}
                      images={publication.imagenes.map((image) => image.url)}
                    />
                  );
                })
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
export default SearchBarResultsPage;
