import React from 'react'

function ColorPallet({ changeColor, buildMode }) {
  const handleClick = (element) => {
    const color = element.target.style.backgroundColor;
    console.log(color);
    changeColor(color);
  }

  // Vibrant color palette with good contrast
  const colors = [
    "#FF6B6B", // Coral Red
    "#4ECDC4", // Turquoise
    "#FFE66D", // Sunny Yellow
    "#A8E6CF", // Mint Green
    "#FF8B94", // Pink
    "#C7CEEA", // Lavender
    "#FFDAB9", // Peach
    "#B4E7F5", // Sky Blue
    "#DDA15E", // Copper
    "#98D8C8", // Seafoam
    "#F7B7A3", // Salmon
    "#D4A5A5", // Dusty Rose
    "#9B6B6B", // Brown
    "#6A4C93", // Purple
    "#1982C4", // Ocean Blue
    "#8AC926", // Lime Green
    "#FFCA3A", // Gold
    "#FF595E", // Red
    "#C9ADA7", // Taupe
    "#FFFFFF"  // White (for reset/empty)
  ];

  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-option"
          onClick={handleClick}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  )
}

export default ColorPallet