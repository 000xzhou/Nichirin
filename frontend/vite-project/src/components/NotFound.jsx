const NotFound = () => {
  return (
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0" />
      <text
        x="50%"
        y="50%"
        font-family="Arial, Helvetica, sans-serif"
        font-size="60"
        fill="#333"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        404 Not Found
      </text>
      <line
        x1="50%"
        y1="60%"
        x2="50%"
        y2="70%"
        stroke="#333"
        stroke-width="2"
      />
      <circle
        cx="50%"
        cy="75%"
        r="10"
        stroke="#333"
        stroke-width="2"
        fill="none"
      />
      <line
        x1="47%"
        y1="77%"
        x2="53%"
        y2="73%"
        stroke="#333"
        stroke-width="2"
      />
      <line
        x1="53%"
        y1="77%"
        x2="47%"
        y2="73%"
        stroke="#333"
        stroke-width="2"
      />
    </svg>
  );
};

export default NotFound;
