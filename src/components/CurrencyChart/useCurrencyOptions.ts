import { useMemo } from "react";

export function useCurrencyOptions(data: any){
  return useMemo(
      () => ({
        title: {
          text: !data?.name ? "Loading..." : data.name,
        },
        xAxis: {
          labels: {
            enabled: false,
          },
        },
        tooltip: {
          formatter: function (this: any) {
            return `<b>${new Date(this.x).toLocaleDateString("ru-RU")}</b><br/><b>${(this.y).toFixed(2)} $</b>`;
          },
        },
        plotOptions: {
          type: "line",
        },
        legend: { enabled: false },
        series: [
          {
            data: data?.price_history ?? [],
            color: "green",
          },
        ],
        chart: {
          zooming: {
            type: "x",
          },
          styleMode: true,
          type: "line",
          style: {
            borderRadius: "6px",
            backgroundColor: "#1e293b",
          },
        },
      }),
      [data],
    );
}