import { useMemo } from "react";

export function useCurrencyOptions(data: any){
  return useMemo(
      () => ({
        title: {
          text: !data?.name ? "Loading..." : data.name,
          style: {
            color: 'rgb(238, 238, 238)'
          }
        },
        xAxis: {
          labels: {
            enabled: false,
          },
        },
        yAxis: {
          gridLineColor: 'rgb(57, 62, 70)',
          title: {
            text: null
          },
          labels: {
            style: {
              color: 'rgb(238, 238, 238)'
            }
          }
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
            color:' rgb(50, 130, 184)',
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
          },
          backgroundColor: "rgb(34, 40, 49)",
        },
      }),
      [data],
    );
}