import { useMemo } from "react";

export function useSparklineOptions(data: any) {
return useMemo(
    () => ({
      boost: {
        enabled: true,
        seriesThreshold: 1,
        usePreallocated: true,
      },
      chart: {
        type: "spline",
        backgroundColor: "transparent",
        borderWidth: 0,
        height: 30,
        margin: [2, 0, 2, 0],
        style: {
          overflow: "visible",
        },
      },
      title: { text: undefined },
      credits: { enabled: false },
      xAxis: { visible: false },
      yAxis: {
        visible: false,
        endOnTick: false,
        startOnTick: false,
      },
      tooltip: { enabled: false },
      legend: { enabled: false },
      series: [
        {
          data: !data?.price_history
            ? []
            : data?.price_history.map((el: [number, number]) => el[1]),
          type: "spline",
          lineWidth: 1.5,
          animation: false,
          marker: { enabled: false },
          enableMouseTracking: false,
        },
      ],
    }),
    [data],
  );
}