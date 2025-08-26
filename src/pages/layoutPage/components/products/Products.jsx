/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const GuillotinePacking = ({
  width,
  height,
  items,
  method = "grasp",
  relaxation = 5,
}) => {
  const [allSheets, setAllSheets] = useState([]);
  const [wastePercentages, setWastePercentages] = useState([]);

  useEffect(() => {
    const fitItemsInSheet = (containerWidth, containerHeight, items, method, relaxation) => {
      const gridSize = 1;
      const gridWidth = Math.floor(containerWidth / gridSize);
      const gridHeight = Math.floor(containerHeight / gridSize);
      const placed = [];
      let usedArea = 0;

      if (method === "grasp") {
        items.sort((a, b) => b.height - a.height + relaxation * Math.random());
      } else {
        items.sort((a, b) => b.height - a.height);
      }

      let spaces = [{ x: 0, y: 0, width: gridWidth, height: gridHeight }];
      let remainingItems = [];

      for (let item of items) {
        let itemWidth = Math.ceil(item.width / gridSize);
        let itemHeight = Math.ceil(item.height / gridSize);
        let placedSuccessfully = false;

        spaces.sort((a, b) => a.y - b.y || a.x - b.x);

        for (let i = 0; i < spaces.length; i++) {
          const space = spaces[i];

          if (itemWidth <= space.width && itemHeight <= space.height) {
            placed.push({
              ...item,
              x: space.x * gridSize,
              y: space.y * gridSize,
              rotated: false,
            });
            placedSuccessfully = true;
          } else if (itemHeight <= space.width && itemWidth <= space.height) {
            placed.push({
              ...item,
              x: space.x * gridSize,
              y: space.y * gridSize,
              rotated: true,
            });
            [itemWidth, itemHeight] = [itemHeight, itemWidth];
            placedSuccessfully = true;
          }

          if (placedSuccessfully) {
            usedArea += itemWidth * itemHeight;

            const rightSpace = {
              x: space.x + itemWidth,
              y: space.y,
              width: space.width - itemWidth,
              height: itemHeight,
            };
            const bottomSpace = {
              x: space.x,
              y: space.y + itemHeight,
              width: space.width,
              height: space.height - itemHeight,
            };
            spaces.splice(i, 1);
            if (rightSpace.width > 0 && rightSpace.height > 0) spaces.push(rightSpace);
            if (bottomSpace.width > 0 && bottomSpace.height > 0) spaces.push(bottomSpace);
            break;
          }
        }

        if (!placedSuccessfully) {
          remainingItems.push(item);
        }
      }

      const totalArea = gridWidth * gridHeight;
      const waste = ((totalArea - usedArea) / totalArea) * 100;

      return { placed, remainingItems, waste };
    };

    // Manejar múltiples láminas
    let remaining = [...items];
    let sheets = [];
    let wastes = [];

    while (remaining.length > 0) {
      const { placed, remainingItems, waste } = fitItemsInSheet(width, height, remaining, method, relaxation);
      sheets.push(placed);
      wastes.push(waste.toFixed(2));
      remaining = remainingItems;
    }

    setAllSheets(sheets);
    setWastePercentages(wastes);
  }, [width, height, items, method, relaxation]);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {allSheets.map((sheet, sheetIndex) => (
        <div key={sheetIndex} style={{ marginBottom: "20px" }}>
          <span style={{ display: "block", fontSize: "16px", fontWeight: "bold" }}>
            Lámina {sheetIndex + 1}: {width}cm x {height}cm
          </span>
          <span style={{ display: "block", marginBottom: "10px", fontSize: "14px", color: "red" }}>
            Desperdicio: {wastePercentages[sheetIndex]}%
          </span>
          <svg
            width={width * 3}
            height={height * 3}
            style={{ border: "1px solid", backgroundColor: "lightgray" }}
          >
            {sheet.map((item, index) => {
              const rectWidth = (item.rotated ? item.height : item.width) * 3;
              const rectHeight = (item.rotated ? item.width : item.height) * 3;
              const centerX = item.x * 3 + rectWidth / 2;
              const centerY = item.y * 3 + rectHeight / 2;

              return (
                <g key={index}>
                  <rect
                    x={item.x * 3}
                    y={item.y * 3}
                    width={rectWidth}
                    height={rectHeight}
                    fill={item.color.hex}
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <text
                    x={item.x * 3 + rectWidth / 2}
                    y={item.y * 3 + rectHeight / 2}
                    fontSize="14"
                    fill="black"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(-90, ${centerX}, ${centerY})`}
                  >
                    {`${item.width} x ${item.height}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ))}
    </div>
  );
};

export default GuillotinePacking;
