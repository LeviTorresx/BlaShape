/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const GuillotinePacking = ({
  width,
  height,
  items,
  method = "grasp",
  relaxation = 5,
}) => {
  const [sheets, setSheets] = useState([]);
  const [wastePercentages, setWastePercentages] = useState([]);

  useEffect(() => {
    const fitItemsIntoSheets = (
      containerWidth,
      containerHeight,
      items,
      method,
      relaxation
    ) => {
      const gridSize = 1;
      const gridWidth = Math.floor(containerWidth / gridSize);
      const gridHeight = Math.floor(containerHeight / gridSize);

      const placedSheets = [];
      const wasteArray = [];

      let remainingItems = [...items];

      while (remainingItems.length > 0) {
        const placed = [];
        let usedArea = 0;

        let currentItems = [...remainingItems];

        // Ordenar items
        if (method === "grasp") {
          currentItems.sort(
            (a, b) => b.height - a.height + relaxation * Math.random()
          );
        } else {
          currentItems.sort((a, b) => b.height - a.height);
        }

        let spaces = [{ x: 0, y: 0, width: gridWidth, height: gridHeight }];
        const stillRemaining = [];

        for (let item of currentItems) {
          let itemWidth = Math.ceil(item.width / gridSize);
          let itemHeight = Math.ceil(item.height / gridSize);
          let placedSuccessfully = false;

          spaces.sort((a, b) => a.y - b.y || a.x - b.x);

          for (let i = 0; i < spaces.length; i++) {
            const space = spaces[i];

            // Sin rotar
            if (itemWidth <= space.width && itemHeight <= space.height) {
              placed.push({
                ...item,
                x: space.x * gridSize,
                y: space.y * gridSize,
                rotated: false,
              });
              placedSuccessfully = true;
            }
            // Rotado
            else if (itemHeight <= space.width && itemWidth <= space.height) {
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
              if (rightSpace.width > 0 && rightSpace.height > 0)
                spaces.push(rightSpace);
              if (bottomSpace.width > 0 && bottomSpace.height > 0)
                spaces.push(bottomSpace);
              break;
            }
          }

          if (!placedSuccessfully) {
            stillRemaining.push(item);
          }
        }

        const totalArea = gridWidth * gridHeight;
        const waste = ((totalArea - usedArea) / totalArea) * 100;
        placedSheets.push(placed);
        wasteArray.push(waste.toFixed(2));

        remainingItems = stillRemaining;
      }

      setSheets(placedSheets);
      setWastePercentages(wasteArray);
    };

    fitItemsIntoSheets(width, height, items, method, relaxation);
  }, [width, height, items, method, relaxation]);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {sheets.map((placedItems, sheetIndex) => (
        <div key={sheetIndex} style={{ marginBottom: "20px" }}>
          <span
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Lámina {sheetIndex + 1} - {width}cm x {height}cm
          </span>
          <span
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "14px",
              color: "red",
            }}
          >
            Desperdicio: {wastePercentages[sheetIndex]}%
          </span>
          <svg
            width={width * 3}
            height={height * 3}
            style={{ border: "1px solid", backgroundColor: "gray" }}
          >
            {placedItems.map((item, index) => {
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
