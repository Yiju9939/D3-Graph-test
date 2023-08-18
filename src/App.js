import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const App = () => {
  const svgRef = useRef(null); // React ref를 사용하여 SVG 엘리먼트를 참조합니다.
  let categoriesY = []; // 범주의 Y 위치를 저장하는 배열

  useEffect(() => {
    const svg = d3.select(svgRef.current); // D3로 SVG 엘리먼트를 선택합니다.

    categoriesY = []; // 범주의 Y 위치 배열을 초기화합니다.
    const width = 800;
    const height = 400;

    // 선을 그리기 위한 생성기를 정의합니다.
    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    // 축을 정의합니다.
    const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);
    svg.append("g").call(yAxis);

    // 색상 스케일을 정의합니다. D3의 기본 10가지 카테고리 컬러를 사용합니다.
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 각 선 데이터를 순회하면서 그래프를 그립니다.
    lines.forEach((line, idx) => {
      const lineColor = colorScale(idx); // idx를 기반으로 색상을 지정합니다.
      let lineEndY = line.points[line.points.length - 1].y;
      let lineEndX = line.points[line.points.length - 1].x;
      let labelY = lineEndY;

      // 범주의 위치가 다른 범주와 겹치는지 확인하고, 겹칠 경우 위치를 조정합니다.
      let overlaps = true;
      while (overlaps) {
        overlaps = false;
        for (let y of categoriesY) {
          if (Math.abs(y - labelY) < 20) {
            labelY -= 20; // 겹치면 위로 20만큼 이동합니다.
            overlaps = true;
            break;
          }
        }
      }

      categoriesY.push(labelY); // 조정된 Y 위치를 배열에 추가합니다.

      // 점선을 SVG에 추가합니다.
      svg
        .append("line")
        .attr("x1", lineEndX)
        .attr("y1", lineEndY)
        .attr("x2", lineEndY !== labelY ? width + 15 : width + 27)
        .attr("y2", lineEndY)
        .attr("stroke", lineColor)
        .attr("stroke-dasharray", "5,5");

      // 선의 끝과 범주명 사이에 꺾는 선을 추가합니다.
      if (lineEndY !== labelY) {
        svg
          .append("line")
          .attr("x1", width + 15)
          .attr("y1", lineEndY)
          .attr("x2", width + 15)
          .attr("y2", labelY)
          .attr("stroke", idx % 2 === 0 ? "blue" : "red")
          .attr("stroke-dasharray", "5,5");

        svg
          .append("line")
          .attr("x1", width + 15)
          .attr("y1", labelY)
          .attr("x2", width + 30)
          .attr("y2", labelY)
          .attr("stroke", idx % 2 === 0 ? "blue" : "red")
          .attr("stroke-dasharray", "5,5");
      }

      // 범주명을 SVG에 추가합니다.
      svg
        .append("text")
        .attr("x", width + 35)
        .attr("y", labelY + 5)
        .attr("fill", lineColor)
        .text(line.category);

      // 데이터를 기반으로 선을 SVG에 추가합니다.
      svg
        .append("path")
        .attr("d", lineGenerator(line.points))
        .attr("stroke", lineColor)
        .attr("fill", "none");
    });
  }, []);

  return <svg ref={svgRef} width={900} height={400}></svg>;
};

export default App;

const lines = [
  {
    points: [
      { x: 52, y: 340 },
      { x: 145, y: 242 },
      { x: 243, y: 158 },
      { x: 359, y: 236 },
      { x: 456, y: 333 },
      { x: 541, y: 227 },
      { x: 644, y: 148 },
      { x: 731, y: 239 },
    ],
    category: "범주 1",
  },
  {
    points: [
      { x: 57, y: 124 },
      { x: 149, y: 321 },
      { x: 252, y: 213 },
      { x: 355, y: 137 },
      { x: 444, y: 321 },
      { x: 548, y: 129 },
      { x: 643, y: 212 },
      { x: 742, y: 323 },
    ],
    category: "범주 2",
  },
  {
    points: [
      { x: 49, y: 189 },
      { x: 143, y: 279 },
      { x: 249, y: 198 },
      { x: 357, y: 287 },
      { x: 442, y: 195 },
      { x: 539, y: 278 },
      { x: 649, y: 199 },
      { x: 737, y: 292 },
    ],
    category: "범주 3",
  },
  {
    points: [
      { x: 59, y: 295 },
      { x: 141, y: 192 },
      { x: 255, y: 295 },
      { x: 349, y: 188 },
      { x: 457, y: 296 },
      { x: 544, y: 182 },
      { x: 652, y: 292 },
      { x: 739, y: 179 },
    ],
    category: "범주 4",
  },
  {
    points: [
      { x: 54, y: 264 },
      { x: 146, y: 169 },
      { x: 253, y: 266 },
      { x: 351, y: 157 },
      { x: 456, y: 263 },
      { x: 539, y: 154 },
      { x: 641, y: 265 },
      { x: 746, y: 166 },
    ],
    category: "범주 5",
  },
  {
    points: [
      { x: 56, y: 310 },
      { x: 147, y: 218 },
      { x: 248, y: 308 },
      { x: 358, y: 209 },
      { x: 453, y: 312 },
      { x: 540, y: 210 },
      { x: 639, y: 311 },
      { x: 734, y: 216 },
    ],
    category: "범주 6",
  },
  {
    points: [
      { x: 58, y: 234 },
      { x: 142, y: 144 },
      { x: 250, y: 234 },
      { x: 353, y: 137 },
      { x: 454, y: 232 },
      { x: 547, y: 136 },
      { x: 640, y: 238 },
      { x: 748, y: 129 },
    ],
    category: "범주 7",
  },
];
