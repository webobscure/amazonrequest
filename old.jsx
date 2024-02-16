import { useState } from "react";
import "./App.css";

function App() {
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [afnPriceStr, setAfnPriceStr] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [fullfillmentFee, setFullfillmentFee] = useState(null);
  const [storageFee, setStorageFee] = useState(null);

 async function handleSubmit(e) {
  e.preventDefault();
  
    const query = {
      countryCode: "DE",
      itemInfo: {
        tRexId: "12446",
        packageWeight: packageWeight,
        dimensionUnit: "centimeters",
        weightUnit: "kilograms",
        packageLength: packageLength,
        packageWidth: packageWidth,
        packageHeight: packageHeight,
        afnPriceStr: afnPriceStr,
        mfnPriceStr: afnPriceStr,
        mfnShippingPriceStr: shippingPrice,
        currency: "EUR",
        isNewDefined: true,
      },
      programIdList: ["Core", "MFN"],
      programParamMap: {},
    };
  
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=DE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*", 
            "Referer":"https://sellercentral.amazon.de/hz/fba/profitabilitycalculator/index?lang=en_US",
            "Origin":"https://sellercentral.amazon.de"
          },
          body: JSON.stringify(query),
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const res = await response.json();
      setFullfillmentFee(res.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount);
      setStorageFee(res.data.programFeeResultMap.Core.perUnitNonPeakStorageFee.total.amount);
      document.getElementById('result-fee').style.opacity = 1;
    } catch (error) {
      console.error('Error:', error);
    }
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
        <div className="buttons-form">
          <button type="submit" className="btn">
            Count fees
          </button>
          <button
            type="submit"
            className="btn"
            onClick={() => window.location.reload()}
          >
            Reset fees
          </button>
        </div>
      </form>
      <div id="result-fee">
        <p>
          Fullfillment Fee: {fullfillmentFee ? fullfillmentFee : "0"} € <br />{" "}
          Storage Fee: {storageFee ? storageFee : "0"} €
        </p>
      </div>
    </div>
  );
}

export default App;
