import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import apiClient from "../../../scripts/axiosConfig";
import backgroundloginImage from "../../../assets/images/backgroundloginImage.webp";
import ubuntuLogo from "../../../assets/images/ubuntuLogo.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useAuth, Role } from "../../../context/AuthContext";
import { DecodedToken } from "../../../models/InterfaceModels";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null
  );
  const [showMessage, setShowMessage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      if (isExpired(storedToken.replace("Bearer ", ""))) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        const decoded = decodeToken<DecodedToken>(
          storedToken.replace("Bearer ", "")
        );
        if (decoded && decoded.rol) {
          if (decoded.rol === Role.ADMIN) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    }
  }, [navigate]);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    setShowSpinner(true);

    if (!token || isExpired(token)) {
      console.error("Token expirado, por favor intente nuevamente");
      setShowSpinner(false);
      return;
    }

    try {
      const response = await apiClient.post(
        "/oauth2/login",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const receivedAuthToken = response.headers["authorization"];
      const registrationStatus = response.headers["registration"];
      if (registrationStatus === "Registered") {
        setRegistrationMessage("Registro Exitoso");
      } else if (registrationStatus === "Not required") {
        setRegistrationMessage("Bienvenido de nuevo");
      }

      localStorage.setItem("authToken", receivedAuthToken);

      const decoded = decodeToken<DecodedToken>(
        receivedAuthToken.replace("Bearer ", "")
      );
      if (decoded) {
        localStorage.setItem("user", JSON.stringify(decoded));
        if (decoded.rol) {
          setUserRole(decoded.rol);
        }
      }

      login(receivedAuthToken);
      setShowMessage(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  const handleError = () => {
    console.log("Error");
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        if (userRole === Role.ADMIN) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showMessage, userRole, navigate]);

  return (
    <div
      className="login-body"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={backgroundloginImage}
        alt="Imagen de fondo de ubuntu"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <div
        className="login-card"
        style={{
          height: "352px",
          width: "328px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "var(--blanco)",
          borderRadius: "8px",
        }}
      >
        <div
          className="login-card_info"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="login-card_info--tittle-logo"
            style={{
              flexBasis: "66%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="login-card_tittle"
              style={{
                width: "200px",
                height: "96px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                className="login-card_tittle_h1"
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: "28px",
                  lineHeight: "32px",
                  textAlign: "center",
                  color: "var(--negro)",
                  fontWeight: "700",
                }}
              >
                <b>
                  Ingreso
                  <br />
                  Administrador
                </b>
              </h1>
            </div>
            <div
              className="login-card_logo"
              style={{
                textAlign: "center",
              }}
            >
              <img
                src={ubuntuLogo}
                alt="Logo de Ubuntu"
                style={{
                  width: "33px",
                  height: "75px",
                }}
              />
            </div>
          </div>
          <div
            className="login-card_button"
            style={{
              flexBasis: "33%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {showMessage ? (
              <h1
                className="login-card_tittle_h1"
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: "28px",
                  lineHeight: "32px",
                  textAlign: "center",
                  color: "var(--negro)",
                  fontWeight: "700",
                  marginTop: 24,
                }}
              >
                {registrationMessage}
              </h1>
            ) : showSpinner ? (
              <CircularProgress
                style={{
                  color: "#59BA47",
                  marginTop: 24,
                }}
              />
            ) : (
              <div
                style={{
                  marginTop: 24,
                }}
              >
                <GoogleLogin
                  theme="filled_blue"
                  shape="pill"
                  onSuccess={handleSuccess}
                  onError={handleError}
                  useOneTap
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
