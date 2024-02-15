import { useState } from "react";
import axios from 'axios'
import "./App.css";

function App() {
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [afnPriceStr, setAfnPriceStr] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");

  let query = {
    countryCode: "DE",
    itemInfo: {
        tRexId: "12446",
        packageWeight: "",
        dimensionUnit: "centimeters",
        weightUnit: "kilograms",
        packageLength: "",
        packageWidth: "",
        packageHeight: "",
        afnPriceStr: "",
        mfnPriceStr: "",
        mfnShippingPriceStr: "",
        currency: "EUR",
        isNewDefined: true
    },
    programIdList: [
        "Core",
        "MFN"
    ],
    programParamMap: {}
}

  const handleSubmit = (e) => {
    e.preventDefault();
    query.itemInfo.packageWeight = packageWeight;
    query.itemInfo.packageLength = packageLength;
    query.itemInfo.packageWidth = packageWidth;
    query.itemInfo.packageHeight = packageHeight;
    query.itemInfo.afnPriceStr = afnPriceStr;
    query.itemInfo.mfnPriceStr = afnPriceStr;
    query.itemInfo.mfnShippingPriceStr = shippingPrice

    console.log(query);

    axios.post('https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=DE', (req,res) => {
      console.log(req,res)
    })
  }

  return (
    <div className="container">
      <h1>Amazon Revenue Calculator</h1>
      <form action="POST" className="form-container" onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="packageWeight">Package Weight</label>
          <input
            type="text"
            name="packageWeight"
            id="packageWeight"
            placeholder="Напишите вес груза"
            value={packageWeight}
            onChange={(e) => setPackageWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageLength">Package Length</label>
          <input
            type="text"
            name="packageLength"
            id="packageLength"
            placeholder="Напишите длину груза"
            value={packageLength}
            onChange={(e) => setPackageLength(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageWidth">Package Width</label>
          <input
            type="text"
            name="packageWidth"
            id="packageWidth"
            placeholder="Напишите ширину груза"
            value={packageWidth}
            onChange={(e) => setPackageWidth(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageHeight">Package Height</label>
          <input
            type="text"
            name="packageHeight"
            id="packageHeight"
            placeholder="Напишите высоту груза"
            value={packageHeight}
            onChange={(e) => setPackageHeight(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="afnPriceStr">Price</label>
          <input
            type="text"
            name="afnPriceStr"
            id="afnPriceStr"
            placeholder="Цена груза"
            value={afnPriceStr}
            onChange={(e) => setAfnPriceStr(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="mfnShippingPriceStr">Shipping Price</label>
          <input
            type="text"
            name="mfnShippingPriceStr"
            id="mfnShippingPriceStr"
            placeholder="Цена доставки груза"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Просчитать стоимость</button>
      </form>
    </div>
  );
}

export default App;
