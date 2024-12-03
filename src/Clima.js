import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DayContainer = styled.div`
  width: 800px;
  min-height: 235px;
  position: relative;
  padding: 25px;
  background: radial-gradient(
      178.94% 106.41% at 26.42% 106.41%,
      #fff7b1 0%,
      rgba(255, 255, 255, 0) 71.88%
    ),
    #ffffff;
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01),
    0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09),
    0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: default;
  margin: 1.5rem auto;

  &:hover {
    transform: scale(1.02);
  }
`;

const WeatherContainer = styled.div`
  width: 250px;
  height: 250px;
  position: absolute;
  right: -35px;
  top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
`;

const Cloud = styled.div`
  width: 250px;
  &.front {
    padding-top: 45px;
    margin-left: 25px;
    display: inline;
    position: absolute;
    z-index: 11;
    animation: clouds 8s infinite;
    animation-timing-function: ease-in-out;
  }

  &.back {
    margin-top: -30px;
    margin-left: 150px;
    z-index: 12;
    animation: clouds 12s infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes clouds {
    0% {
      transform: translateX(15px);
    }
    50% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(15px);
    }
  }
`;

const CloudPart = styled.span`
  &.left-front {
    width: 65px;
    height: 65px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  &.right-front {
    width: 45px;
    height: 45px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -25px;
    z-index: 5;
  }

  &.left-back {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  &.right-back {
    width: 50px;
    height: 50px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -20px;
    z-index: 5;
  }
`;

const Sun = styled.span`
  width: 120px;
  height: 120px;
  background: linear-gradient(to right, #fcbb04, #fffc00);
  border-radius: 60px;
  display: inline;
  position: absolute;
  margin-top: 20px;

  &.sunshine {
    animation: sunshines 2s infinite;
  }

  @keyframes sunshines {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderText = styled.span`
  &:first-child {
    word-break: break-all;
    font-weight: 800;
    font-size: 15px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.66);
  }

  &:last-child {
    font-weight: 700;
    font-size: 26px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.33);
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WeatherInfo = styled.div`
  position: relative;
  width: 350px;
  height: 235px;
`;

const ChartSection = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  height: 235px;
`;

const TemperatureStats = styled.div`
  position: absolute;
  left: 25px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainTemp = styled.span`
  font-weight: 700;
  font-size: 80px;
  color: rgba(87, 77, 51, 1);
`;

const MinMaxTemp = styled.div`
  display: flex;
  gap: 15px;
  font-size: 20px;
  color: rgba(87, 77, 51, 0.8);
  margin-top: -10px;
`;

const TempLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: ${(props) => (props.type === "max" ? '"↑"' : '"↓"')};
    font-size: 18px;
    color: ${(props) => (props.type === "max" ? "#dc3545" : "#0d6efd")};
  }
`;

const LoadingDiv = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: rgba(87, 77, 51, 0.66);
  margin: 20px 0;
`;

const Clima = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/clima`)
      .then((response) => {
        const data = response.data;
        setTemperatura(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos del clima:", error);
        setLoading(false);
      });
  }, []);

  const agruparPorDia = (datos) => {
    const temperaturaPorDia = {};

    datos.hourly.temperature_2m.forEach((temp, index) => {
      const fecha = new Date(datos.hourly.time[index]);
      const dia = fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const diaCapitalizado = dia
        .split(" ")
        .map((palabra) =>
          palabra.toLowerCase() === "de"
            ? palabra
            : palabra.charAt(0).toUpperCase() + palabra.slice(1)
        )
        .join(" ");

      if (!temperaturaPorDia[diaCapitalizado]) {
        temperaturaPorDia[diaCapitalizado] = {
          temperaturas: [],
          horas: [],
        };
      }

      temperaturaPorDia[diaCapitalizado].temperaturas.push(temp);
      temperaturaPorDia[diaCapitalizado].horas.push(
        fecha.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    });

    return temperaturaPorDia;
  };

  return (
    <>
      {loading ? (
        <LoadingDiv>Cargando...</LoadingDiv>
      ) : (
        Object.entries(agruparPorDia(temperatura)).map(([dia, datos]) => {
          const maxTemp = Math.max(...datos.temperaturas).toFixed(1);
          const minTemp = Math.min(...datos.temperaturas).toFixed(1);
          const avgTemp = (
            datos.temperaturas.reduce((a, b) => a + b, 0) /
            datos.temperaturas.length
          ).toFixed(1);

          return (
            <DayContainer key={dia}>
              <CardContent>
                <WeatherInfo>
                  <WeatherContainer>
                    <Cloud className="front">
                      <CloudPart className="left-front" />
                      <CloudPart className="right-front" />
                    </Cloud>
                    <Sun className="sunshine" />
                    <Sun />
                    <Cloud className="back">
                      <CloudPart className="left-back" />
                      <CloudPart className="right-back" />
                    </Cloud>
                  </WeatherContainer>

                  <CardHeader>
                    <HeaderText>{dia}</HeaderText>
                  </CardHeader>

                  <TemperatureStats>
                    <MainTemp>{avgTemp}°</MainTemp>
                    <MinMaxTemp>
                      <TempLabel type="max">{maxTemp}°</TempLabel>
                      <TempLabel type="min">{minTemp}°</TempLabel>
                    </MinMaxTemp>
                  </TemperatureStats>
                </WeatherInfo>

                <ChartSection>
                  <Line
                    data={{
                      labels: datos.horas.map((hora) => hora + "h"),
                      datasets: [
                        {
                          data: datos.temperaturas,
                          borderColor: "rgb(220, 53, 69)",
                          tension: 0.4,
                          fill: true,
                          backgroundColor: "rgba(220, 53, 69, 0.1)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `${context.parsed.y}°C`;
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            callback: function (value) {
                              return value + "°C";
                            },
                          },
                          title: {
                            display: true,
                            text: "Temperatura (°C)",
                          },
                        },
                      },
                    }}
                  />
                </ChartSection>
              </CardContent>
            </DayContainer>
          );
        })
      )}
    </>
  );
};

export default Clima;
