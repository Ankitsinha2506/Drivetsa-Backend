const carImages = {
  "Toyota-Corolla":
    "https://i.pinimg.com/736x/03/15/a3/0315a3ede39b089082f24277868bfb09.jpg",
  "Hyundai-Creta":
    "https://i.pinimg.com/736x/f8/6f/e5/f86fe531d696f3152f13e3407cedf009.jpg",
  "Honda-Civic":
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/27074/civic-exterior-right-front-three-quarter-148156.jpeg?q=80",
  "Ford-Figo":
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/35463/figo-exterior-right-front-three-quarter-151687.jpeg?q=80",
  "Nissan-Sunny":
    "https://imgd.aeplcdn.com/664x374/cw/ec/9725/Nissan-Sunny-Exterior-114974.jpg?wm=0&q=80",
  "Honda-City":
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-rear-three-quarter.jpeg?isig=0&q=80",
  "Maruti-Swift":
    "https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-left-front-three-quarter-28.jpeg?isig=0&q=80",
  // Add more mappings
};

export function getCarImageURL(brand, model) {
  const key = `${brand}-${model}`.replace(/\s+/g, "-");
  console.log("Generated Key for Image Mapping:", key);
  return (
    carImages[key] ||
    "https://i.pinimg.com/736x/bb/2f/f8/bb2ff849f0adb5381d583963a16b38c0.jpg"
  );
}
