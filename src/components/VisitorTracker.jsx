import { useEffect, useState } from "react";

function generateIP() {

  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function VisitorTracker({
  embedded = false,
}) {

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {

      const countries = [
        "India",
        "USA",
        "Germany",
        "Japan",
        "Brazil",
        "Canada",
      ];

      const newVisitor = {
        ip: generateIP(),
        country:
          countries[
            Math.floor(Math.random() * countries.length)
          ],
      };

      setVisitors((prev) => [
        newVisitor,
        ...prev.slice(0, 5),
      ]);

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div
  className={
    embedded
      ? "text-green-400"
      : `
          absolute top-28 right-5
          w-72
          cyber-panel
          z-50
        `
  }
>

      <h2 className="font-bold mb-4">
        VISITOR TRACKER
      </h2>

      <div className="space-y-2 text-sm">

        {visitors.map((visitor, index) => (

          <div key={index}>

            {visitor.ip}
            {" "}
            —
            {" "}
            {visitor.country}

          </div>
        ))}

      </div>

    </div>
  );
}

export default VisitorTracker;